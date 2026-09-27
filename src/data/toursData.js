export const TOURS_DATA = [
  {
    id: "kyoto-autumn",
    title: "Kyoto Autumn Circuit",
    destination: "Japan",
    region: "Asia",
    days: 8,
    basePrice: 1890,
    difficulty: "Moderate",
    rating: 4.95,
    reviewsCount: 142,
    badge: "Bestseller",
    groupSize: "Max 10 travelers",
    season: "Oct – Dec",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "Temple walks, traditional ryokans, and vibrant momiji foliage across historic Kansai and the Arashiyama bamboo forest.",
    highlights: [
      "Private tea ceremony in an 18th-century Kyoto machiya",
      "Dawn meditation with Zen monks at Nanzen-ji",
      "Stay in an authentic hot-spring onsen ryokan in Hakone",
      "Guided culinary expedition through Nishiki Market"
    ],
    included: [
      "7 nights premium heritage accommodations",
      "All regional shinkansen bullet train passes",
      "Daily artisan breakfasts & 4 traditional Kaiseki dinners",
      "Licensed English-speaking cultural master guide"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kyoto", desc: "Welcome dinner in Gion and private lantern-lit walking orientation." },
      { day: 2, title: "Torii Gates & Bamboo Groves", desc: "Early access to Fushimi Inari-taisha and peaceful Arashiyama trails." },
      { day: 3, title: "Zen Gardens & Golden Pavilion", desc: "Contemplate Ryoan-ji rock garden and Kinkaku-ji gilded reflection." },
      { day: 4, title: "Historic Nara Excursion", desc: "Todai-ji colossal bronze Buddha and sacred deer park walks." },
      { day: 5, title: "Tea Terraces of Uji", desc: "Harvest matcha in scenic Uji hills with master tea cultivators." },
      { day: 6, title: "Hakone Mountain Onsen", desc: "Scenic mountain railway to thermal baths overlooking Mt. Fuji." },
      { day: 7, title: "Art & Culinary Discovery", desc: "Hands-on pottery workshop and grand farewell Kaiseki feast." },
      { day: 8, title: "Departure", desc: "Breakfast and seamless bullet train transfer to Kansai / Tokyo." }
    ]
  },
  {
    id: "amalfi-trek",
    title: "Amalfi Coastline Trek",
    destination: "Italy",
    region: "Europe",
    days: 6,
    basePrice: 1450,
    difficulty: "Challenging",
    rating: 4.88,
    reviewsCount: 98,
    badge: "Scenic Highlight",
    groupSize: "Max 12 travelers",
    season: "Apr – Oct",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    description: "Traverse the legendary Path of the Gods with dramatic Mediterranean cliffs, terraced vineyards, and pastel coastal hamlets.",
    highlights: [
      "Hike the panoramic Sentiero degli Dei (Path of the Gods)",
      "Private wooden boat cruise around Capri and hidden sea caves",
      "Artisan limoncello tasting in historic Ravello cliffside gardens",
      "Sunset dining in Positano overlooking the shimmering Tyrrhenian Sea"
    ],
    included: [
      "5 nights boutique cliff-view hotel stays",
      "Private boat excursion to Capri with skipper",
      "Luggage transfers between daily trail waypoints",
      "Expert UIAGM certified mountain & coastline guides"
    ],
    itinerary: [
      { day: 1, title: "Rendezvous in Sorrento", desc: "Check-in at cliffside hotel, briefing, and sunset aperitivo." },
      { day: 2, title: "The Path of the Gods", desc: "Breathtaking 12km ridgeline hike from Bomerano down to Nocelle." },
      { day: 3, title: "Ravello & Valle delle Ferriere", desc: "Explore medieval Villa Cimbrone and lush fern-draped waterfalls." },
      { day: 4, title: "Capri Sea Voyage", desc: "Private gozzo boat to Faraglioni rocks, White Grotto, and swimming." },
      { day: 5, title: "Positano Coastal Cliffs", desc: "Coastal stairs descent through olive orchards to Positano beach." },
      { day: 6, title: "Farewell in Naples", desc: "Morning espresso, lemon pastry tasting, and transfer to Naples." }
    ]
  },
  {
    id: "patagonia-peaks",
    title: "Patagonian Fjords & Peaks",
    destination: "Chile",
    region: "Americas",
    days: 11,
    basePrice: 2600,
    difficulty: "Advanced",
    rating: 4.97,
    reviewsCount: 185,
    badge: "Epic Adventure",
    groupSize: "Max 8 travelers",
    season: "Nov – Mar",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
    description: "Glacial expeditions and granite towers in Torres del Paine National Park, sailing cobalt fjords and encountering wild guanacos.",
    highlights: [
      "Full trek to the base of the iconic Torres del Paine granite towers",
      "Ice trekking with crampons on Grey Glacier with polar guides",
      "Catamaran navigation across turquoise Lake Pehoé",
      "Stargazing under unpolluted southern skies at an eco-camp"
    ],
    included: [
      "10 nights split between luxury domes and backcountry mountain refugios",
      "All national park conservation permits and catamaran fees",
      "Technical glacier trekking gear (crampons, harness, ice axe)",
      "High-caloric expedition meals & local Patagonian wines"
    ],
    itinerary: [
      { day: 1, title: "Puerto Natales Arrival", desc: "Expedition gear check, team briefing, and Patagonian lamb roast." },
      { day: 2, title: "Torres del Paine Gateway", desc: "Drive into the park, wildlife spotting, and camp setup under Las Torres." },
      { day: 3, title: "Base of the Towers", desc: "Ascend the Ascencio Valley to the glacial tarn beneath towering monoliths." },
      { day: 4, title: "Lake Nordenskjöld Trail", desc: "Traverse along turquoise waters beneath the jagged Cuernos peaks." },
      { day: 5, title: "French Valley Amphitheater", desc: "Hike deep into the hanging glaciers and hanging cirques of Valle del Francés." },
      { day: 6, title: "Grey Glacier Approach", desc: "Trek through southern beech forests towards the massive Southern Ice Field." },
      { day: 7, title: "Ice Trek on Glacier Grey", desc: "Navigate deep blue crevasses and seracs with specialized ice guides." },
      { day: 8, title: "Sailing Lake Pehoé", desc: "Catamaran crossing and photographic safari of wild guanacos." },
      { day: 9, title: "Laguna Azul & Cascada Paine", desc: "Explore eastern park vistas where Lady Florence Dixie first rode." },
      { day: 10, title: "Milodon Cave & Celebration", desc: "Visit ancient prehistoric cave and celebratory banquet." },
      { day: 11, title: "Departure", desc: "Punta Arenas airport transfers for international flights." }
    ]
  },
  {
    id: "serengeti-safari",
    title: "Serengeti Migration Trail",
    destination: "Tanzania",
    region: "Africa",
    days: 7,
    basePrice: 3100,
    difficulty: "Easy",
    rating: 4.96,
    reviewsCount: 160,
    badge: "Wildlife Wonder",
    groupSize: "Max 6 travelers",
    season: "Jun – Oct",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    description: "Witness the Great Migration across open savannahs, track the Big Five, and sleep in eco-luxury mobile tented safari camps.",
    highlights: [
      "Mara River crossings with hundreds of thousands of wildebeest",
      "Descend into Ngorongoro Crater, the world's largest volcanic caldera",
      "Sunrise hot-air balloon flight with champagne breakfast over the plains",
      "Authentic cultural exchange with local Maasai community elders"
    ],
    included: [
      "6 nights high-end luxury canvas tented lodges",
      "Private customized 4x4 open-roof Land Cruisers with unlimited mileage",
      "Park entrance conservation fees for Serengeti & Ngorongoro",
      "Professional silver-level KPSGA certified safari naturalist"
    ],
    itinerary: [
      { day: 1, title: "Arusha to Tarangire", desc: "Ancient baobabs, large elephant herds, and luxury tented arrival." },
      { day: 2, title: "Ngorongoro Crater Floor", desc: "Full day tracking black rhinos, pride lions, and flamingo alkaline lakes." },
      { day: 3, title: "Central Serengeti Plains", desc: "Drive into the endless plains; observe leopard tracking on kopjes." },
      { day: 4, title: "River Crossing Quest", desc: "Position near northern Mara River crossings to observe river crossings." },
      { day: 5, title: "Dawn Balloon Safari", desc: "Float silently over predator movements at first light, followed by bush breakfast." },
      { day: 6, title: "Maasai Cultural Exchange", desc: "Learn traditional bushcraft, botany, and cultural history from elders." },
      { day: 7, title: "Kilimanjaro Flight", desc: "Bush airstrip fly-out back to Kilimanjaro International Airport." }
    ]
  },
  {
    id: "iceland-aurora",
    title: "Iceland Arctic Lights & Ice Caves",
    destination: "Iceland",
    region: "Europe",
    days: 7,
    basePrice: 2250,
    difficulty: "Moderate",
    rating: 4.92,
    reviewsCount: 114,
    badge: "Winter Magic",
    groupSize: "Max 10 travelers",
    season: "Nov – Mar",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
    description: "Bathe in geothermal lagoons, hike inside crystal sapphire ice caves, and chase the dancing Aurora Borealis across black sand shores.",
    highlights: [
      "Explore natural blue crystal ice caves beneath Vatnajökull glacier",
      "Private geothermal soak in the Sky Lagoon overlooking the North Atlantic",
      "Walk behind Seljalandsfoss waterfall and admire Skógafoss thunder",
      "Diamond Beach iceberg shores and Jökulsárlón glacier lagoon"
    ],
    included: [
      "6 nights boutique Nordic hotels with northern lights wake-up calls",
      "Modified Super Jeep transport with Wi-Fi and aurora tracking radar",
      "Glacier helmets, crampons, and glacier safety guides",
      "Sky Lagoon Pure Pass entry and welcome toast"
    ],
    itinerary: [
      { day: 1, title: "Reykjavik Arrival", desc: "Explore vibrant city center and evening geothermal spa immersion." },
      { day: 2, title: "The Golden Circle", desc: "Thingvellir rift valley, Geysir eruptions, and Gullfoss roaring canyon." },
      { day: 3, title: "South Coast Waterfalls & Black Sands", desc: "Seljalandsfoss, Skógafoss, and the basalt columns of Reynisfjara beach." },
      { day: 4, title: "Vatnajökull Crystal Ice Cave", desc: "Super Jeep into the heart of Europe's largest glacier to sapphire ice vaults." },
      { day: 5, title: "Diamond Beach & Glacial Lagoon", desc: "Watch colossal icebergs drift into the ocean; evening aurora chase." },
      { day: 6, title: "Eldhraun Lava Fields & Reykjavik", desc: "Moss-carpeted volcanic fields and celebration dinner in the capital." },
      { day: 7, title: "Keflavik Farewell", desc: "Relaxation and transfers to Keflavik Airport." }
    ]
  },
  {
    id: "peru-machu-picchu",
    title: "Inca Trail & Machu Picchu",
    destination: "Peru",
    region: "Americas",
    days: 9,
    basePrice: 1980,
    difficulty: "Challenging",
    rating: 4.94,
    reviewsCount: 137,
    badge: "World Heritage",
    groupSize: "Max 10 travelers",
    season: "May – Sep",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    description: "Ascend ancient stone staircases, conquer Dead Woman's Pass, and step through the Sun Gate to behold Machu Picchu at sunrise.",
    highlights: [
      "Classic 4-day Inca Trail trek with licensed Quechua porters",
      "Sunrise arrival at Inti Punku (Sun Gate) overlooking Machu Picchu",
      "Sacred Valley weaver cooperative immersion and ancient salt pans of Maras",
      "Gourmet Andean farm-to-table dining in historic Cusco"
    ],
    included: [
      "Official Inca Trail trekking permit & Machu Picchu sanctuary pass",
      "Vistadome panoramic train ride back to Cusco",
      "Porters carrying all group gear, chef-prepared hot trail cuisine",
      "Acclimatization boutique hotel in Cusco & Sacred Valley"
    ],
    itinerary: [
      { day: 1, title: "Cusco Colonial History", desc: "Acclimatize in Cusco, Plaza de Armas, and Sacsayhuamán megaliths." },
      { day: 2, title: "Sacred Valley & Ollantaytambo", desc: "Visit Pisac ruins, Maras salt pans, and Ollantaytambo fortress." },
      { day: 3, title: "Inca Trail Milestone: Km 82", desc: "Begin trek along the Urubamba River to Wayllabamba campsite." },
      { day: 4, title: "Conquering Dead Woman's Pass", desc: "Climb to Warmiwañusqa (4,215m) for panoramic views of cloud forests." },
      { day: 5, title: "Runkurakay & Wiñay Wayna", desc: "Stone tunnels, orchid valleys, and the terraced jewel of Wiñay Wayna." },
      { day: 6, title: "The Sun Gate & Machu Picchu", desc: "Dawn arrival at the Sun Gate; in-depth tour of the lost Inca citadel." },
      { day: 7, title: "Huayna Picchu & Aguas Calientes", desc: "Optional peak climb, relaxation in hot springs, and return train." },
      { day: 8, title: "Cusco Culinary & Artisan Walk", desc: "Pisco sour masterclass and San Pedro market immersion." },
      { day: 9, title: "Departure", desc: "Transfer to Cusco airport for flight connections." }
    ]
  },
  {
    id: "norway-fjords",
    title: "Norwegian Arctic Fjords",
    destination: "Norway",
    region: "Europe",
    days: 8,
    basePrice: 2480,
    difficulty: "Moderate",
    rating: 4.89,
    reviewsCount: 89,
    badge: "Fjord Expedition",
    groupSize: "Max 10 travelers",
    season: "Jun – Sep",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "Kayaking glassy fjords below roaring waterfalls, hiking Pulpit Rock, and riding the world-famous Flåm mountain railway.",
    highlights: [
      "Sunrise hike to the sheer 604m precipice of Preikestolen (Pulpit Rock)",
      "Silent electric catamaran cruise through UNESCO Nærøyfjord",
      "Sea kayak alongside seals in pristine Geirangerfjord",
      "Scenic ride on the steep Flåm Railway through 20 tunnels"
    ],
    included: [
      "7 nights traditional wooden fjord hotels and waterfront rorbuer",
      "All fjord ferry cruises and electric rail passes",
      "Sea kayak equipment and wilderness safety instructor",
      "Nordic farm breakfasts and fresh Arctic salmon dinners"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bergen", desc: "Explore colorful UNESCO Bryggen wharf and fresh fish market." },
      { day: 2, title: "Flåm Railway & Aurlandsfjord", desc: "Steep train into mountain valleys and historic fjord hotel check-in." },
      { day: 3, title: "Nærøyfjord Electric Cruise", desc: "Silent gliding past 1,000m sheer cliff faces and roaring waterfalls." },
      { day: 4, title: "Glacier Finger Hike", desc: "Trek to the blue ice tongue of Nigardsbreen in Jostedalsbreen." },
      { day: 5, title: "Geirangerfjord Sea Kayak", desc: "Paddle under the famous Seven Sisters waterfalls." },
      { day: 6, title: "Stavanger & Pulpit Rock Ascent", desc: "Early morning hike to Preikestolen hovering above Lysefjord." },
      { day: 7, title: "Coastal Island Route", desc: "Ferry cruise through archipelagos and farewell Nordic banquet." },
      { day: 8, title: "Stavanger Departure", desc: "Transfer to Stavanger Airport." }
    ]
  },
  {
    id: "nz-alps",
    title: "Southern Alps & Milford Sound",
    destination: "New Zealand",
    region: "Oceania",
    days: 10,
    basePrice: 2890,
    difficulty: "Moderate",
    rating: 4.98,
    reviewsCount: 172,
    badge: "Top Rated",
    groupSize: "Max 10 travelers",
    season: "Nov – Apr",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    description: "Aotearoa's grand alpine peaks, turquoise glacial lakes of Tekapo, helicopter mountain landings, and Milford Sound fiords.",
    highlights: [
      "Overnight luxury cruise anchored in the serenity of Milford Sound",
      "Scenic helicopter alpine flight with snow landing on Mt. Cook",
      "Stargazing in the Aoraki Mackenzie International Dark Sky Reserve",
      "Hike the Roys Peak track overlooking Lake Wanaka and peaks"
    ],
    included: [
      "9 nights boutique alpine lodges and private ship cabin",
      "Mt. Cook helicopter alpine flight with glacier touch-down",
      "Milford Sound vessel cruise with nature specialist",
      "All park permits, luxury sprinter van transfers, and wine tastings"
    ],
    itinerary: [
      { day: 1, title: "Queenstown Welcome", desc: "Lakeside orientation, skyline gondola, and Central Otago pinot noir." },
      { day: 2, title: "Lake Wanaka & Roys Peak", desc: "Hike overlooking pristine bays and the jagged Southern Alps." },
      { day: 3, title: "Mount Aspiring Valley", desc: "Walk through mossy beech forests with sparkling glacial braided rivers." },
      { day: 4, title: "Milford Road Journey", desc: "Drive through Homer Tunnel to the eighth wonder of the world." },
      { day: 5, title: "Milford Sound Overnight Cruise", desc: "Kayak alongside dolphins and sleep beneath sheer granite monoliths." },
      { day: 6, title: "Te Anau Glowworm Caves", desc: "Subterranean boat ride under thousands of bioluminescent glowworms." },
      { day: 7, title: "Aoraki / Mount Cook", desc: "Hooker Valley track walk across swing bridges toward iceberg lakes." },
      { day: 8, title: "Helicopter Glacier Landing", desc: "Soar above the Tasman Glacier and step onto perpetual snowfields." },
      { day: 9, title: "Lake Tekapo & Stargazing", desc: "Church of the Good Shepherd and observatory telescope session." },
      { day: 10, title: "Christchurch Departure", desc: "Scenic Canterbury plains drive and airport farewell." }
    ]
  }
];

export const TIER_CONFIG = {
  Backpacker: {
    multiplier: 0.85,
    label: "Backpacker (-15%)",
    tagline: "Authentic & Budget-Friendly",
    features: [
      "Shared boutique hostel/mountain refugio rooms",
      "Self-guided trek options with GPS waypoints",
      "Luggage self-carry on hiking sections",
      "Full access to group guide briefings"
    ]
  },
  Standard: {
    multiplier: 1.0,
    label: "Standard (Recommended)",
    tagline: "Comfort & Seamless Logistics",
    features: [
      "Private 3-to-4 star character hotels & ryokans",
      "Complimentary luggage porterage throughout",
      "All regional transfers & park permits included",
      "Daily breakfast & curated regional dinners"
    ]
  },
  "Luxury Elite": {
    multiplier: 1.6,
    label: "Luxury Elite (+60%)",
    tagline: "Ultra-Premium & VIP Concierge",
    features: [
      "5-star private chalets, suites & luxury lodges",
      "Private vehicle upgrades & helicopter/boat priority",
      "24/7 dedicated trip concierge & personal guide",
      "All-inclusive fine dining & premium wines"
    ]
  }
};

export const ADDONS_CONFIG = [
  { id: "carbon-offset", name: "100% Certified Carbon Offset", price: 25, desc: "Offsets all flight & vehicle emissions via verified rewilding." },
  { id: "gear-rental", name: "Premium Technical Gear Kit", price: 65, desc: "High-end trekking poles, daypack, rain shell & waterproof drybag." },
  { id: "travel-insurance", name: "Adventure Care & Medical Evac", price: 45, desc: "Comprehensive helicopter rescue & trip interruption shield." }
];