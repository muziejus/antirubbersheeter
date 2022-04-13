import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class StateService extends Service {
  @tracked
  step: "upload" | "place" | "download" = "place";

  @tracked width = 9118;

  @tracked height = 6428;

  @tracked maxZoom = 7;

  @tracked mapUuid = "020bc7c3-9b9a-4766-8f58-91aad87e888e";

  // @tracked typedPlaces = "Foo, bar, malinque, melody, adriana";

  @tracked placesData = places;

  /*
  @tracked
  step: "upload" | "place" | "download" = "upload";

  @tracked width = 0;

  @tracked height = 0;

  @tracked maxZoom = 0;

  @tracked mapUuid = "";

  @tracked typedPlaces = "";
  */

  @tracked placesUuid = "";

  uploadUrl = "http://localhost:8080/upload";

  // @tracked placesData: Record<string, string | number>[] = [];

  @tracked placesDataNameColumn = "name";

  @tracked places: Record<string, string | number>[] = [];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    state: StateService;
  }
}

const places = [
  {
    church: "Second Mount Zion Church",
    pastor: "Harber Lammesfelder",
    street: "Impala Trail",
    city: "Sleepy Eye",
  },
  {
    church: "Community Covenant Church of San Andreas",
    pastor: "Hocequin Bassiere",
    street: "Burkes Promise Alley",
    city: "Amaya",
  },
  {
    church: "Aenon Baptist Church",
    pastor: "Philopoemon Berangere",
    street: "South Koppie Green",
    city: "Hiseville",
  },
  {
    church: "Spencer Hill Church",
    pastor: "Fridolin Seubering",
    street: "Patuxent Rise Southeast",
    city: "Oologah",
  },
  {
    church: "Saint Raphael Catholic Church",
    pastor: "Hippotas Fattori",
    street: "East Ryemead Rise",
    city: "Matewan",
  },
  {
    church: "Greeley Church",
    pastor: "Baudet Corsini",
    street: "Southwest Kirschenman Grove",
    city: "Loco Hills",
  },
  {
    church: "Spaulding Road Church of God",
    pastor: "Hendry Rodin",
    street: "Topper Walk",
    city: "Sunset Acres",
  },
  {
    church: "Dunkard Church",
    pastor: "Nicholas Radu",
    street: "Pepper Ridge Plaza",
    city: "Orono",
  },
  {
    church: "Steinway Reformed Church",
    pastor: "Empedocles Dahm",
    street: "East Horsell Common Canyon",
    city: "Willow Valley",
  },
  {
    church: "Evangelische-Friedenskirche Church",
    pastor: "Rudegerus Brennicke",
    street: "Borinsky Causeway",
    city: "Washburn",
  },
  {
    church: "Cluster Church",
    pastor: "Argi Torrisi",
    street: "North Drewstead Arch",
    city: "White House",
  },
  {
    church: "College Hill RP Church",
    pastor: "Philonikos Ko",
    street: "South Kains Rise",
    city: "North Bennington",
  },
  {
    church: "Bethel African Methodist Episcopal Church",
    pastor: "Hartmudus Matthyssen",
    street: "Sedona Green",
    city: "Russellville",
  },
  {
    church: "Nativity of Our Lord Catholic Church",
    pastor: "Froila Moushine",
    street: "Edington Lane West",
    city: "Happys Inn",
  },
  {
    church: "Southern Church",
    pastor: "Priamon Vial",
    street: "Reiten Mount",
    city: "Moss Beach",
  },
  {
    church: "New Lebanon Baptist Church",
    pastor: "Julf Hlutev",
    street: "Northeast Mutton Arcade",
    city: "Springvale",
  },
  {
    church: "Hollywood Baptist Church",
    pastor: "Bide le Chandelier",
    street: "Southwest Sleets Heights",
    city: "Loyalhanna",
  },
  {
    church: "Union Salem Church",
    pastor: "Philpoemon Carides",
    street: "Mattos Walk",
    city: "Lincolndale",
  },
  {
    church: "Lansing Assembly of God Church",
    pastor: "Herchier Ingres",
    street: "West Beards Point",
    city: "Bridgeton",
  },
  {
    church: "Waterfront Rescue Mission",
    pastor: "Gerbotho Cabanel",
    street: "South Edgwarebury Mount",
    city: "Angels",
  },
  {
    church: "White Oak Church",
    pastor: "Vitus Argo",
    street: "Marshalswick Cove",
    city: "Ephraim",
  },
  {
    church: "Mision Bautista De Riverside",
    pastor: "Martin Sulejmani",
    street: "Twin Palms Close",
    city: "Pleasant Run",
  },
  {
    church: "Fountain Heights Baptist Church",
    pastor: "Hicetaon Pirandello",
    street: "Leadbetter Gardens Northeast",
    city: "Selma",
  },
  {
    church: "Brooksville Church of the Nazarene",
    pastor: "Leodes Maurois",
    street: "Northwest French Creek",
    city: "Elberfeld",
  },
  {
    church: "Central Baptist Church",
    pastor: "Estmond Marinello",
    street: "North Cosmo Road",
    city: "Thief River Falls",
  },
  {
    church: "Living Word Christian Church",
    pastor: "Lyulph Pantoliano",
    street: "Saracen Path",
    city: "Lewisville",
  },
  {
    church: "Flushing Presbyterian Church",
    pastor: "Ernisius Becart",
    street: "Down Patrick Drive",
    city: "Matfield Green",
  },
  {
    church: "Livingston First Baptist Church",
    pastor: "Tharuaro Berchoven",
    street: "South Pengel Mews",
    city: "Emery",
  },
  {
    church: "Mount Calvary Baptist Church",
    pastor: "Artzeiz Kümlin",
    street: "Communication Hill Turnpike North",
    city: "Kempner",
  },
  {
    church: "Village United Church of Christ",
    pastor: "Hicetaon Groer",
    street: "South Margerie Lawn",
    city: "Verdigre",
  },
  {
    church: "Most Precious Blood Catholic Church",
    pastor: "Firminus Ennis",
    street: "Pine Needle North",
    city: "Dundee",
  },
  {
    church: "Abanda Baptist Church",
    pastor: "Sesuldo Mazzolani",
    street: "South Hobbis Place",
    city: "Wadena",
  },
  {
    church: "Elm Springs Church",
    pastor: "Rycharde Funck",
    street: "Smithtown Lane North",
    city: "Bivalve",
  },
  {
    church: "Buddhas Light International Association",
    pastor: "Sabas Hubchev",
    street: "Northeast Fringe Tree",
    city: "Verdon",
  },
  {
    church: "Whitesville Church",
    pastor: "Boltof Coppens",
    street: "Sweetmans Crescent",
    city: "Broadview Heights",
  },
  {
    church: "Eastside Bible Fellowship Church",
    pastor: "Orti Spirlea",
    street: "North St. Cyprians",
    city: "Slabtown",
  },
  {
    church: "Christian Tabernacle",
    pastor: "Iigo Klaeber",
    street: "North Cherry Oak",
    city: "Pena",
  },
  {
    church: "East Greene Church",
    pastor: "Dicken Penchev",
    street: "Rusch Byway East",
    city: "Ware Shoals",
  },
  {
    church: "A F Siebert Chapel",
    pastor: "Beti Marsuryn",
    street: "Bambrick Route",
    city: "Pimmit Hills",
  },
  {
    church: "Saint James United Methodist Church",
    pastor: "Anastasios Carrat",
    street: "Blackpond Terrace",
    city: "Albers",
  },
  {
    church: "Episcopal Church of the Holy Spirit",
    pastor: "Glycerius Bracci",
    street: "Walnut Place East",
    city: "Grainfield",
  },
  {
    church: "Johns Chapel",
    pastor: "Bobbie Cipolloni",
    street: "North Dant Mall",
    city: "Fountain Valley",
  },
  {
    church: "Trinity Church of the Nazarene",
    pastor: "Agobard Carpentier",
    street: "Northwest Nyora Gate",
    city: "Dunnigan",
  },
  {
    church: "Vivian Chapel Methodist Church",
    pastor: "Ponce Henning",
    street: "Headley High Nook",
    city: "Franklin Springs",
  },
  {
    church: "Iglesea Bautista El Camino Church",
    pastor: "Gerbotho Magne",
    street: "North Platt Fold Mews",
    city: "Bostwick",
  },
  {
    church: "Pentecostal Missionary Baptist Church",
    pastor: "Fulbertus Seubering",
    street: "East Glenn Curtiss",
    city: "Indios",
  },
  {
    church: "Cortelyou Baptist Church",
    pastor: "Godewinus Schiaffino",
    street: "Vasquez View",
    city: "De Funiak Springs",
  },
  {
    church: "Mount Hilliard Church",
    pastor: "Dymas Saurine",
    street: "Welder Avenue",
    city: "Purcellville",
  },
  {
    church: "Glory of God Lutheran Church",
    pastor: "Rafold Charriol",
    street: "Northeast Thurleigh Terrace",
    city: "Jamaica",
  },
  {
    church: "Greater New Morning Star Baptist Church",
    pastor: "Anter Aresti",
    street: "West Pleasant Spring",
    city: "Cairo",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "North Steigdiacre",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "North Steigdiacre is a small town, known for the North Steigdiacre music festival.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Latheche Du Boolbatt Colonies",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Latheche Du Boolbatt Colonies is a small city, known for its elaborate legends.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Goddon",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Goddon is a large town, known for its tech industry.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Biglassshot",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Biglassshot is a small town, known for its car factory.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Dsorstianedge",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Dsorstianedge is a sprawling town, known for its cheese exportation.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Biaros-In-Wellslakecombe",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Biaros-In-Wellslakecombe is a small town situated besides a lake. It is known for being the setting of a famous story.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "St News",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "St News is a small town named after Saint News. It is known for theatre.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Saint Stonegate",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Saint Stonegate is a small city, known for UFO reports.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Woorarden Town",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Woorarden Town is a sprawling town, known for progressive values.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Nah",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Nah is a large city, known for its car factory.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "El Earcan Du Habir",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "El Earcan Du Habir is a small city, known for being the birthplace of a music genre.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "East Fhamlderfra",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "East Fhamlderfra is a sprawling town, known for the East Fhamlderfra music festival.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Bamptickstos Falls",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Bamptickstos Falls is a sprawling city, known for elopement.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Fallsperc City",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Fallsperc City is a large town, known for its culture.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Bridge",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Bridge is a sprawling city, known for its historic significance.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "North Bouvil",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "North Bouvil is a large city, known for tourism.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Fort Biersta",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Fort Biersta is a small town, known for a great train robbery.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Beeforks",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Beeforks is a small city, known for its castle.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Hartntaine Beach",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Hartntaine Beach is a coastal, small town, known for its arena.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Cape Fleetsaultryn",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Cape Fleetsaultryn is a small city, known for its palace.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "South Oapryor",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "South Oapryor is a large town, known for its elaborate legends.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Port Colxmin",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Port Colxmin is a coastal, small town, known for conservative values.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Dochesldezrior",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Dochesldezrior is a sprawling city, known for theatre.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Cul",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Cul is a large town, known for being the setting of a famous story.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "La Gooldy",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "La Gooldy is a small town, known for its tech industry.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Ncadraton",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Ncadraton is a sprawling city, known for its cheese exportation.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Grand Kuujbrou",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Grand Kuujbrou is a large town, known for its mining heritage.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Shistone",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Shistone is a small town, known for its ghost stories.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Kichilac",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Kichilac is a large town, known for its mention in a famous song.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Scotchippchar",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Scotchippchar is a small town, known for its nightlife.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Kyabeauquesham",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Kyabeauquesham is a sprawling town, known for its mention in a famous song.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Whitepid Aux Gotif Point",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Whitepid Aux Gotif Point is a large city, known for being the birthplace of a music genre.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "South Spearnton",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "South Spearnton is a small town, known for theatre.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Lake Yepcle",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Lake Yepcle is a small town situated besides a lake. It is known for its nightlife.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Nygorsea",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Nygorsea is a coastal, large town, known for elopement.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Lensscone Under Ronte",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Lensscone Under Ronte is a sprawling town, known for its nightlife.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "St Penbrook",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "St Penbrook is a large town named after Saint Penbrook. It is known for its space programme.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Thigunfax",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Thigunfax is a sprawling city, known for its arena.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "San Cast",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "San Cast is a large town named after Saint Cast. It is known for its tech industry.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Thampkingswechester",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Thampkingswechester is a sprawling town, known for its elaborate legends.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "St Nionlyn Upon Ngana",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "St Nionlyn Upon Ngana is a sprawling town named after Saint Nionlyn. It is known for progressive values.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Grand Ckovil",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Grand Ckovil is a large town, known for conservative values.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Sandchuspa",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Sandchuspa is a large town, known for inventing the Sandchuspa cake.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Bridleasa Aux Teton",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Bridleasa Aux Teton is a sprawling town, known for its space programme.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "West Rieple",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "West Rieple is a large town, known for its culture.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Vytaswe",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Vytaswe is a small town, known for its research lab.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Fort Verxstowe-In-Ktoyawelsh",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Fort Verxstowe-In-Ktoyawelsh is a large city, known for its ghost stories.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Linyarmbern",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Linyarmbern is a sprawling town, known for its nightlife.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Maredu",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "Maredu is a large town, known for its car factory.",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "San Tochesley",
  },
  {
    church: "",
    pastor: "",
    street: "",
    city: "San Tochesley is a large town named after Saint Tochesley. It is known for being the setting of a famous story.",
  },
];
