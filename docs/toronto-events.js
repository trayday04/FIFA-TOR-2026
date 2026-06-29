/* Toronto FIFA events — sourced from torontofwc26.ca, toronto.ca, stacktmarket.com, harbourfrontcentre.com */
const TORONTO_VENUES = {"fanfest": {"id": "fanfest", "name": "FIFA Fan Festival™", "place": "Fort York & The Bentway", "address": "250 Fort York Blvd, Toronto, ON", "lat": 43.6373, "lng": -79.4042, "source": "torontofwc26.ca"}, "harbourfront": {"id": "harbourfront", "name": "Canada Soccer House", "place": "Harbourfront Centre", "address": "235 Queens Quay W, Toronto, ON", "lat": 43.6389, "lng": -79.3823, "source": "harbourfrontcentre.com"}, "stackt": {"id": "stackt", "name": "adidas Home of Soccer", "place": "STACKT market", "address": "28 Bathurst St, Toronto, ON", "lat": 43.642, "lng": -79.4025, "source": "stacktmarket.com"}, "nps": {"id": "nps", "name": "Nathan Phillips Square", "place": "City Hall", "address": "100 Queen St W, Toronto, ON", "lat": 43.6526, "lng": -79.3832, "source": "toronto.ca"}};
const TORONTO_EVENT_DAYS = [
  {
    ymd: "2026-06-11",
    label: "Thursday, June 11",
    venues: [
      {
        id: "fanfest",
        hours: "12:30 PM – 7:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Mexico vs South Africa", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
          {t:"All day", title:"Performances: AHI, Skratch Bastid, Walk off the Earth", cat:"entertainment"},
          {t:"All day", title:"Ballet Folklórico Puro México & Mariachi Band Vientos del Norte", cat:"culture"},
        ]
      },
      {
        id: "harbourfront",
        hours: "1:00 PM – 5:30 PM",
        events: [
          {t:"1:00 PM", title:"Doors open — Mexico vs South Africa watch party", cat:"match"},
          {t:"All day", title:"Fan activations, food & live entertainment", cat:"experience"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-12",
    label: "Friday, June 12",
    venues: [
      {
        id: "fanfest",
        hours: "12:30 PM – 11:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Canada vs Bosnia & Herzegovina", cat:"match"},
          {t:"9:00 PM", title:"Match Broadcast: USA vs Paraguay", cat:"match"},
          {t:"All day", title:"Big Wreck, Choir! Choir! Choir! & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "11:00 AM – 11:30 PM",
        tag: "Official launch day",
        events: [
          {t:"3:00 PM", title:"Canada vs Bosnia & Herzegovina watch party", cat:"match"},
          {t:"All day", title:"Grand opening celebrations & partner activations", cat:"experience"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        tag: "Cheer on Canada",
        events: [
          {t:"Featured", title:"Canada Men’s National Team match day", cat:"match"},
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-13",
    label: "Saturday, June 13",
    venues: [
      {
        id: "fanfest",
        hours: "1:00 PM – 11:30 PM",
        events: [
          {t:"1:30 PM", title:"The Strumbellas & Springcreek Dancers", cat:"entertainment"},
          {t:"3:00 PM", title:"Match Broadcast: Qatar vs Switzerland", cat:"match"},
          {t:"5:00 PM", title:"SonReal", cat:"entertainment"},
          {t:"6:00 PM", title:"Match Broadcast: Brazil vs Morocco", cat:"match"},
          {t:"8:00 PM", title:"Anna Sofia", cat:"entertainment"},
          {t:"9:00 PM", title:"Match Broadcast: Haiti vs Scotland", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM, 6 PM, 9 PM & midnight",
        events: [
          {t:"3:00 PM", title:"Qatar vs Switzerland", cat:"match"},
          {t:"6:00 PM", title:"Brazil vs Morocco", cat:"match"},
          {t:"9:00 PM", title:"Haiti vs Scotland", cat:"match"},
          {t:"12:00 AM", title:"Australia vs Türkiye", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-14",
    label: "Sunday, June 14",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 9:30 PM",
        events: [
          {t:"2:30 PM", title:"French Montana & Nagata Shachu", cat:"entertainment"},
          {t:"4:00 PM", title:"Match Broadcast: Netherlands vs Japan", cat:"match"},
          {t:"6:00 PM", title:"Murda Beatz", cat:"entertainment"},
          {t:"7:00 PM", title:"Match Broadcast: Côte d'Ivoire vs Ecuador", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "1 PM, 4 PM, 7 PM & 10 PM",
        events: [
          {t:"1:00 PM", title:"Germany vs Curaçao", cat:"match"},
          {t:"4:00 PM", title:"Netherlands vs Japan", cat:"match"},
          {t:"7:00 PM", title:"Côte d'Ivoire vs Ecuador", cat:"match"},
          {t:"10:00 PM", title:"Tunisia vs Sweden", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-15",
    label: "Monday, June 15",
    venues: [
      {
        id: "nps",
        hours: "Noon, 3 PM, 6 PM & 9 PM",
        events: [
          {t:"12:00 PM", title:"Spain vs Cape Verde", cat:"match"},
          {t:"3:00 PM", title:"Belgium vs Egypt", cat:"match"},
          {t:"6:00 PM", title:"Saudi Arabia vs Uruguay", cat:"match"},
          {t:"9:00 PM", title:"IR Iran vs New Zealand", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-16",
    label: "Tuesday, June 16",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM, 6 PM, 9 PM & midnight",
        events: [
          {t:"3:00 PM", title:"France vs Senegal", cat:"match"},
          {t:"6:00 PM", title:"Iraq vs Norway", cat:"match"},
          {t:"9:00 PM", title:"Argentina vs Algeria", cat:"match"},
          {t:"12:00 AM", title:"Austria vs Jordan", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-17",
    label: "Wednesday, June 17",
    venues: [
      {
        id: "fanfest",
        hours: "2:30 PM – 10:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"3:00 PM", title:"Shad & Ruby Waters", cat:"entertainment"},
          {t:"4:00 PM", title:"Match Broadcast: England vs Croatia", cat:"match"},
          {t:"6:00 PM", title:"Esie Mensah & The Black Stars Collective", cat:"culture"},
          {t:"7:00 PM", title:"Match Broadcast: Ghana vs Panama", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "11:00 AM – 9:30 PM",
        events: [
          {t:"4:00 PM", title:"England vs Croatia watch party", cat:"match"},
          {t:"7:00 PM", title:"Ghana vs Panama watch party", cat:"match"},
          {t:"All day", title:"Live entertainment & interactive fan experiences", cat:"experience"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "7 PM & 10 PM",
        events: [
          {t:"7:00 PM", title:"Ghana vs Panama", cat:"match"},
          {t:"10:00 PM", title:"Uzbekistan vs Colombia", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-18",
    label: "Thursday, June 18",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 11:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Switzerland vs Bosnia & Herzegovina", cat:"match"},
          {t:"6:00 PM", title:"Match Broadcast: Canada vs Qatar", cat:"match"},
          {t:"9:00 PM", title:"Match Broadcast: Mexico vs Korea Republic", cat:"match"},
          {t:"All day", title:"Dwayne Gretzky, The Brokes & HanBeat Nanta", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "2:00 PM – 11:30 PM",
        events: [
          {t:"3:00 PM", title:"Switzerland vs Bosnia & Herzegovina", cat:"match"},
          {t:"6:00 PM", title:"Canada vs Qatar watch party", cat:"match"},
          {t:"9:00 PM", title:"Mexico vs Korea Republic", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        tag: "Cheer on Canada",
        events: [
          {t:"Featured", title:"Canada Men’s National Team match day", cat:"match"},
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "Noon, 3 PM, 6 PM & 9 PM",
        events: [
          {t:"12:00 PM", title:"Czechia vs South Africa", cat:"match"},
          {t:"3:00 PM", title:"Switzerland vs Bosnia-Herzegovina", cat:"match"},
          {t:"6:00 PM", title:"Canada vs Qatar", cat:"match"},
          {t:"9:00 PM", title:"Mexico vs South Korea", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-19",
    label: "Friday, June 19",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 11:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: USA vs Australia", cat:"match"},
          {t:"6:00 PM", title:"Match Broadcast: Scotland vs Morocco", cat:"match"},
          {t:"9:00 PM", title:"Match Broadcast: Brazil vs Haiti", cat:"match"},
          {t:"All day", title:"Dwayne Gretzky, SuperDogs & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM, 6 PM & 9 PM",
        events: [
          {t:"3:00 PM", title:"USA vs Australia", cat:"match"},
          {t:"6:00 PM", title:"Scotland vs Morocco", cat:"match"},
          {t:"9:00 PM", title:"Brazil vs Haiti", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-20",
    label: "Saturday, June 20",
    venues: [
      {
        id: "fanfest",
        hours: "1:00 PM – 10:30 PM",
        tag: "Ontario Day · Toronto Match Day",
        events: [
          {t:"4:00 PM", title:"Match Broadcast: Germany vs Côte d'Ivoire", cat:"match"},
          {t:"8:00 PM", title:"Match Broadcast: Ecuador vs Curaçao", cat:"match"},
          {t:"All day", title:"Aqyila, k-os, Skratch Bastid & Ontario Campus activations", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "11:00 AM – 10:30 PM",
        events: [
          {t:"4:00 PM", title:"Germany vs Côte d'Ivoire watch party", cat:"match"},
          {t:"8:00 PM", title:"Ecuador vs Curaçao", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "1 PM, 4 PM & 8 PM",
        events: [
          {t:"1:00 PM", title:"Netherlands vs Sweden", cat:"match"},
          {t:"4:00 PM", title:"Germany vs Côte d'Ivoire", cat:"match"},
          {t:"8:00 PM", title:"Ecuador vs Curaçao", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-21",
    label: "Sunday, June 21",
    venues: [
      {
        id: "fanfest",
        hours: "10:30 AM – 9:00 PM",
        events: [
          {t:"12:00 PM", title:"Match Broadcast: Spain vs Saudi Arabia", cat:"match"},
          {t:"3:00 PM", title:"Match Broadcast: Belgium vs IR Iran", cat:"match"},
          {t:"6:00 PM", title:"Match Broadcast: Uruguay vs Cape Verde", cat:"match"},
          {t:"All day", title:"Allied Nations, Classic Roots & The Sky Dancers", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "Noon, 3 PM, 6 PM & 9 PM",
        events: [
          {t:"12:00 PM", title:"Spain vs Saudi Arabia", cat:"match"},
          {t:"3:00 PM", title:"Belgium vs IR Iran", cat:"match"},
          {t:"6:00 PM", title:"Uruguay vs Cape Verde", cat:"match"},
          {t:"9:00 PM", title:"New Zealand vs Egypt", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-22",
    label: "Monday, June 22",
    venues: [
      {
        id: "nps",
        hours: "1 PM, 5 PM, 8 PM & 11 PM",
        events: [
          {t:"1:00 PM", title:"Argentina vs Austria", cat:"match"},
          {t:"5:00 PM", title:"France vs Iraq", cat:"match"},
          {t:"8:00 PM", title:"Norway vs Senegal", cat:"match"},
          {t:"11:00 PM", title:"Jordan vs Algeria", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-23",
    label: "Tuesday, June 23",
    venues: [
      {
        id: "fanfest",
        hours: "11:30 AM – 10:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"1:00 PM", title:"Match Broadcast: Portugal vs Uzbekistan", cat:"match"},
          {t:"4:00 PM", title:"Match Broadcast: England vs Ghana", cat:"match"},
          {t:"7:00 PM", title:"Match Broadcast: Panama vs Croatia", cat:"match"},
          {t:"All day", title:"Jully Black, Shawn Desman & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "11:00 AM – 9:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"1:00 PM", title:"Portugal vs Uzbekistan", cat:"match"},
          {t:"4:00 PM", title:"England vs Ghana", cat:"match"},
          {t:"7:00 PM", title:"Panama vs Croatia watch party", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "1 PM, 4 PM, 7 PM & 10 PM",
        events: [
          {t:"1:00 PM", title:"Portugal vs Uzbekistan", cat:"match"},
          {t:"4:00 PM", title:"England vs Ghana", cat:"match"},
          {t:"7:00 PM", title:"Panama vs Croatia", cat:"match"},
          {t:"10:00 PM", title:"Colombia vs Congo DR", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-24",
    label: "Wednesday, June 24",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 11:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Switzerland vs Canada", cat:"match"},
          {t:"6:00 PM", title:"Match Broadcast: TBD", cat:"match"},
          {t:"9:00 PM", title:"Match Broadcast: TBD", cat:"match"},
          {t:"All day", title:"Alessia Cara, Snotty Nose Rez Kids & SHOUT! the band", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "12:00 PM – 11:30 PM",
        events: [
          {t:"3:00 PM", title:"Switzerland vs Canada watch party", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        tag: "Cheer on Canada",
        events: [
          {t:"Featured", title:"Canada Men’s National Team match day", cat:"match"},
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM, 6 PM & 9 PM",
        events: [
          {t:"3:00 PM", title:"TBD", cat:"match"},
          {t:"6:00 PM", title:"TBD", cat:"match"},
          {t:"9:00 PM", title:"TBD", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-25",
    label: "Thursday, June 25",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-26",
    label: "Friday, June 26",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 10:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Senegal vs Iraq", cat:"match"},
          {t:"8:00 PM", title:"Match Broadcast: Uruguay vs Spain", cat:"match"},
          {t:"All day", title:"Kiesza, Ikky, Sorisa & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "1:00 PM – 10:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"3:00 PM", title:"Senegal vs Iraq watch party", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-27",
    label: "Saturday, June 27",
    venues: [
      {
        id: "fanfest",
        hours: "2:30 PM – 10:00 PM",
        events: [
          {t:"5:00 PM", title:"Match Broadcast: Panama vs England", cat:"match"},
          {t:"7:30 PM", title:"Match Broadcast: Colombia vs Portugal", cat:"match"},
          {t:"All day", title:"Rêve & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-28",
    label: "Sunday, June 28",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"3:00 PM", title:"South Africa vs Canada", cat:"match"},
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-29",
    label: "Monday, June 29",
    venues: [
      {
        id: "nps",
        hours: "1 PM, 4:30 PM & 9 PM",
        events: [
          {t:"1:00 PM", title:"Brazil vs Japan", cat:"match"},
          {t:"4:30 PM", title:"Germany vs Paraguay", cat:"match"},
          {t:"9:00 PM", title:"Netherlands vs Morocco", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-06-30",
    label: "Tuesday, June 30",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "1 PM, 5 PM & 9 PM",
        events: [
          {t:"1:00 PM", title:"Côte d'Ivoire vs Norway", cat:"match"},
          {t:"5:00 PM", title:"France vs Sweden", cat:"match"},
          {t:"9:00 PM", title:"Mexico vs Ecuador", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-01",
    label: "Wednesday, July 1",
    venues: [
      {
        id: "harbourfront",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Round of 32 watch parties", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "Noon, 4 PM & 8 PM",
        events: [
          {t:"12:00 PM", title:"England vs Congo DR", cat:"match"},
          {t:"4:00 PM", title:"Belgium vs Senegal", cat:"match"},
          {t:"8:00 PM", title:"USA vs Bosnia & Herzegovina", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-02",
    label: "Thursday, July 2",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 10:30 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Spain vs Austria", cat:"match"},
          {t:"7:00 PM", title:"Match Broadcast: Portugal vs Croatia", cat:"match"},
          {t:"All day", title:"Deborah Cox, TOBi & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "harbourfront",
        hours: "1:00 PM – 10:00 PM",
        tag: "Toronto Match Day",
        events: [
          {t:"3:00 PM", title:"Spain vs Austria watch party", cat:"match"},
          {t:"7:00 PM", title:"Portugal vs Croatia watch party", cat:"match"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM, 7 PM & 11 PM",
        events: [
          {t:"3:00 PM", title:"Spain vs Austria", cat:"match"},
          {t:"7:00 PM", title:"Portugal vs Croatia", cat:"match"},
          {t:"11:00 PM", title:"Switzerland vs Algeria", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-03",
    label: "Friday, July 3",
    venues: [
      {
        id: "fanfest",
        hours: "12:30 PM – 12:15 AM",
        events: [
          {t:"2:00 PM", title:"Match Broadcast: Australia vs Egypt", cat:"match"},
          {t:"6:00 PM", title:"Match Broadcast: Argentina vs Cabo Verde", cat:"match"},
          {t:"9:30 PM", title:"Match Broadcast: Colombia vs Ghana", cat:"match"},
          {t:"All day", title:"Bedouin Soundclash, Tyler Shaw & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-04",
    label: "Saturday, July 4",
    venues: [
      {
        id: "fanfest",
        hours: "11:30 AM – 8:30 PM",
        events: [
          {t:"1:00 PM", title:"Match Broadcast: Round of 16", cat:"match"},
          {t:"5:00 PM", title:"Match Broadcast: Round of 16", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "1 PM",
        events: [
          {t:"1:00 PM", title:"Round of 16", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-05",
    label: "Sunday, July 5",
    venues: [
      {
        id: "fanfest",
        hours: "1:30 PM – 10:30 PM",
        events: [
          {t:"4:00 PM", title:"Match Broadcast: Round of 16", cat:"match"},
          {t:"8:00 PM", title:"Match Broadcast: Round of 16", cat:"match"},
          {t:"All day", title:"MICO & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-06",
    label: "Monday, July 6",
    venues: [
      {
        id: "nps",
        hours: "3 PM & 11 PM",
        events: [
          {t:"3:00 PM", title:"Round of 16", cat:"match"},
          {t:"11:00 PM", title:"Round of 16", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-07",
    label: "Tuesday, July 7",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "Noon & 4 PM",
        events: [
          {t:"12:00 PM", title:"Round of 16", cat:"match"},
          {t:"4:00 PM", title:"Round of 16", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-08",
    label: "Wednesday, July 8",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-09",
    label: "Thursday, July 9",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-10",
    label: "Friday, July 10",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-11",
    label: "Saturday, July 11",
    venues: [
      {
        id: "fanfest",
        hours: "2:30 PM – 12:00 AM",
        events: [
          {t:"5:00 PM", title:"Match Broadcast: Quarter-final", cat:"match"},
          {t:"9:00 PM", title:"Match Broadcast: Quarter-final", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-12",
    label: "Sunday, July 12",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-14",
    label: "Tuesday, July 14",
    venues: [
      {
        id: "fanfest",
        hours: "12:30 PM – 6:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Semi-final", cat:"match"},
          {t:"All day", title:"Sam Roberts Band & Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM",
        events: [
          {t:"3:00 PM", title:"Semi-final", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-15",
    label: "Wednesday, July 15",
    venues: [
      {
        id: "fanfest",
        hours: "12:30 PM – 6:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Semi-final", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM",
        events: [
          {t:"3:00 PM", title:"Semi-final", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-16",
    label: "Thursday, July 16",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-17",
    label: "Friday, July 17",
    venues: [
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-18",
    label: "Saturday, July 18",
    venues: [
      {
        id: "fanfest",
        hours: "2:00 PM – 9:00 PM",
        events: [
          {t:"5:00 PM", title:"Match Broadcast: Bronze Final", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "5 PM",
        events: [
          {t:"5:00 PM", title:"Bronze Final", cat:"match"},
        ]
      },
    ]
  },
  {
    ymd: "2026-07-19",
    label: "Sunday, July 19",
    venues: [
      {
        id: "fanfest",
        hours: "12:00 PM – 8:30 PM",
        events: [
          {t:"3:00 PM", title:"Match Broadcast: Championship Final", cat:"match"},
          {t:"All day", title:"Kardinal Offishall Presents: Soundclash Society", cat:"entertainment"},
        ]
      },
      {
        id: "stackt",
        hours: "11:00 AM – 11:00 PM",
        events: [
          {t:"All day", title:"Official FIFA World Cup watch parties on 13.5×24 ft screen", cat:"match"},
          {t:"All day", title:"adidas retail pop-up & on-site activations", cat:"experience"},
        ]
      },
      {
        id: "nps",
        hours: "3 PM",
        events: [
          {t:"3:00 PM", title:"Championship Final", cat:"match"},
        ]
      },
    ]
  },
];