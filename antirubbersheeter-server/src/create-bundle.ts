import fs from "fs";
import archiver from "archiver";
import { Request, Response } from "express";

interface BundleData {
  center: [number, number];
  popupField: string;
  maxZoom: number;
  mapUuid: string;
  bounds: {
    northWest: {
      lat: number;
      lng: number;
    };
    southEast: {
      lat: number;
      lng: number;
    };
  };
  csvUuid?: string;
  places: Record<string, string | number>[];
}

const createBundle = (request: Request, response: Response) => {
  try {
    const data = request.body as BundleData;
    const path = `public/uploads/${data.mapUuid}`;

    //1. copy csv if it exists to tiles folder
    //2. craete data.json
    fs.writeFileSync(
      [path, "data.json"].join("/"),
      JSON.stringify(request.body, null, 2)
    );

    fs.writeFileSync(
      [path, "data.js"].join("/"),
      "const data = " + JSON.stringify(request.body, null, 2) + ";"
    );

    //3. generate boilerplate html
    fs.writeFileSync([path, "index.html"].join("/"), generateHtmlString(data));

    //4. zip everything up and give it to download.
    const zipfilePath = `public/uploads/antirubbersheeter-${data.mapUuid}.zip`;
    const archive = archiver("zip");
    const zipfile = fs.createWriteStream(zipfilePath);

    // response.writeHead(200, {
    //   "Content-Type": "application/zip",
    //   "Content-disposition": `attachment; filename=antirubbersheeter-${data.mapUuid}.zip`,
    // });

    zipfile.on("close", () => {
      console.log(
        `Archiver bundled ${zipfilePath}, and it is ready for download`
      );
      const zipfileUri = zipfilePath.replace("public", "");
      response.send({ zipfileUri });
      // response.download(zipfilePath, error => {
      //   if (error) {
      //     console.log("if error triggered");
      //     console.log(error);
      //     if (response.headersSent) {
      //       // Headers were sent but?
      //     } else {
      //       throw error;
      //     }
      //   }
      // });
    });

    archive.on("warning", error => {
      if (error.code === "ENOENT") {
        console.log(error);
      } else {
        throw error;
      }
    });

    archive.on("error", error => {
      throw error;
    });

    archive.pipe(zipfile);

    archive.directory(path, false);

    archive.finalize();
  } catch (error) {
    response.status(500).send(error);
  }
};

const generateHtmlString = (data: BundleData) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Map for ${data.mapUuid}</title>
    <style>
      body {
        padding: 0px;
        margin: 0px;
      }
      #map {
        height: 100vh;
        width: 100vw;
      }
    </style>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
       integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
       crossorigin=""/>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
       integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
       crossorigin=""></script>
    <script src="data.js"></script>
    <script>
      // Establish map
      const bounds = L.latLngBounds(
          [${data.bounds.northWest.lat}, ${data.bounds.northWest.lng}], 
          [${data.bounds.southEast.lat}, ${data.bounds.southEast.lng}]
        );
      const map = L.map('map', {
        crs: L.CRS.Simple,
        maxZoom: ${data.maxZoom},
        bounds,
        center: bounds.getCenter(),
        zoom: 1,
      });

      // Add tiles.
      L.tileLayer('tiles/{z}/{y}/{x}.png', {
        attribution: '<a href="http://antirubbersheeter.moacir.com">Antirubbersheeter</a>',
        zoomOffset: -1,
      }).addTo(map);

      // Add markers.
      const { places } = data;
      for (const place of places) {
        const marker = L.marker([place.antirubbersheeterLat, place.antirubbersheeterLng]).addTo(map);
      }

      // Fly to bounds
      map.flyToBounds(bounds);
    </script>
  </body>
</html>
`;
};

export default createBundle;
