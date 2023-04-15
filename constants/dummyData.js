import { icons, images } from "./";

const myProfile = {
    name: "Guest",
    profile_image: images.profile
}

const categories = [
    {
        id: 1,
        name: "Fast Food",
        icon: icons.burger
    },
    {
        id: 2,
        name: "Fruit Item",
        icon: icons.cherry
    },
    {
        id: 3,
        name: "Rice Item",
        icon: icons.rice
    }
]

const hamburger = {
    id: 1,
    name: "Hamburger",
    description: "A huge single or triple burger with all the fixings, cheese, lettuce, tomato, onions and special sauce or mayonnaise!",
    categories: [1, 2],
    price: 15.99,
    rating: 4.9,
    isFavourite: true,
    views:500,
    duration: "30 mins",
    serving: 1,
    author: {
        profilePic: images.UserProfile1,
        name: "Cheff. Sponjbob",
    },
    image: require("../assets/dummyData/burger2.jpg"),
    ingredients: [
        {
            id: 1,
            description: "Dried Chilli",
            quantity: "30g"
        },
        {
            id: 2,
            description: "Garlic cloves",
            quantity: "3"
        },
        {
            id: 3,
            description: "Egg",
            quantity: "10"
        },
        {
            id: 4,
            description: "rice",
            quantity: "1kg"
        },
        {
            id: 5,
            description: "Dried anchovies",
            quantity: "3 cups"
        },


    ]
}

const hotTacos = {
    id: 2,
    name: "Hot Tacos",
    description: "A traditional Mexican food consisting of a small hand-sized corn- or wheat-based tortilla topped with a filling.",
    categories: [1, 3],
    price: 10.99,
    rating: 3.2,
    isFavourite: false,
    views:10100,
    duration: "30 mins",
    serving: 4,
    author: {
        profilePic: images.UserProfile2,
        name: "Bibi Gail",
    },
    image: require("../assets/dummyData/tacos2.jpg"),
    ingredients: [
        {
            id: 1,
            description: "Garlic cloves",
            quantity: "3"
        },
        {
            id: 2,
            description: "Lemongrass",
            quantity: "2 stalks"
        },
        {
            id: 3,
            description: "Egg",
            quantity: "2"
        },
        {
            id: 4,
            description: "Fresh Shrimp",
            quantity: "100g"
        },
        {
            id: 5,
            description: "Shallot",
            quantity: "4"
        },
        {
            id: 6,
            description: "vermicelli",
            quantity: "100g"
        },

    ]
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "A popular spice and vegetables mixed favoured rice dish which is typically prepared by layering the biryani gravy and basmati rice in flat bottom vessel.",
    categories: [1, 2, 3],
    price: 10.99,
    rating: 4.3,
    isFavourite: true,
    views:930,
    duration: "40 mins",
    serving: 5,
    author: {
        profilePic: images.UserProfile3,
        name: "Maxwell",
    },
    image: require("../assets/dummyData/biryani.jpg"),
    ingredients: [
        {
            id: 1,
            description: "Spaghetti pasta",
            quantity: "100g"
        },
        {
            id: 2,
            description: "Olive Oil",
            quantity: "2 tbsp"
        },
        {
            id: 3,
            description: "Fresh Shrimp",
            quantity: "100g"
        },
        {
            id: 4,
            description: "Campari tomatoes",
            quantity: "100g"
        },
        {
            id: 5,
            description: "Salt",
            quantity: "¾ tbsp"
        },
        {
            id: 6,
            description: "Black Pepper",
            quantity: "¼ tbsp"
        },

    ]
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "A culinary dish made with a soft flatbread rolled around a filling of beef, vegetables and sauces.",
    categories: [1, 2],
    price: 10.99,
    rating: 4.7,
    isFavourite: true,
    views:1200,
    duration: "25 mins",
    serving: 2,
    author: {
        profilePic: images.UserProfile4,
        name: "Intruder",
    },
    image: require("../assets/dummyData/wrap2.jpg")
    ,
    ingredients: [
        {
            id: 1,
            description: "Boneless Chicken Thighs",
            quantity: "1kg"
        },
        {
            id: 2,
            description: "Lemongrass stalk",
            quantity: "1 stalk"
        },
        {
            id: 3,
            description: "Large Onion",
            quantity: "1"
        },
        {
            id: 4,
            description: "Garlic cloves",
            quantity: "5"
        },
        {
            id: 5,
            description: "Coriander",
            quantity: "1 tsp"
        },

    ]
}

const menu = [
    {
        id: 1,
        name: "Featured",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Nearby you",
        list: [
            wrapSandwich, vegBiryani, hotTacos,
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            hamburger, wrapSandwich, vegBiryani,
        ]
    },
    {
        id: 4,
        name: "Newest",
        list: [
            hotTacos, vegBiryani, hamburger
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            vegBiryani, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 7,
        name: "Popular Searches",
        list: [
            vegBiryani, hamburger, hotTacos, wrapSandwich,
        ]
    },

]


// not rlly important
const trendingRecipes = [
    {
        id: 1,
        name: "Spaghetti With Shrimp Sauce",
        image: images.spagetti,
        duration: "30 mins",
        serving: 1,
        isBookmark: false,
        category: "Pasta",
        author: {
            profilePic: images.UserProfile5,
            name: "Maria",
        },
        ingredients: [
            {
                id: 1,
                icon: icons.pasta,
                description: "Spaghetti pasta",
                quantity: "100g"
            },
            {
                id: 2,
                icon: icons.oil,
                description: "Olive Oil",
                quantity: "2 tbsp"
            },
            {
                id: 3,
                icon: icons.shrimp,
                description: "Fresh Shrimp",
                quantity: "100g"
            },
            {
                id: 4,
                icon: icons.tomato,
                description: "Campari tomatoes",
                quantity: "100g"
            },
            {
                id: 5,
                icon: icons.salt,
                description: "Salt",
                quantity: "¾ tbsp"
            },
            {
                id: 6,
                icon: icons.pepper,
                description: "Black Pepper",
                quantity: "¼ tbsp"
            },

        ],
        viewers: [
            {
                id: 1,
                profilePic: images.UserProfile1
            },
            {
                id: 2,
                profilePic: images.UserProfile2
            },
            {
                id: 3,
                profilePic: images.UserProfile3
            },
            {
                id: 4,
                profilePic: images.UserProfile3
            }
        ]
    },
    {
        id: 2,
        name: "Malaysian Chicken Satay",
        image: images.satay,
        duration: "50 mins",
        serving: 10,
        isBookmark: true,
        category: "Local",
        author: {
            profilePic: images.UserProfile8,
            name: "Mandy",
        },
        ingredients: [
            {
                id: 1,
                icon: icons.chicken,
                description: "Boneless Chicken Thighs",
                quantity: "1kg"
            },
            {
                id: 2,
                icon: icons.lemongrass,
                description: "Lemongrass stalk",
                quantity: "1 stalk"
            },
            {
                id: 3,
                icon: icons.onion,
                description: "Large Onion",
                quantity: "1"
            },
            {
                id: 4,
                icon: icons.garlic,
                description: "Garlic cloves",
                quantity: "5"
            },
            {
                id: 5,
                icon: icons.coriander,
                description: "Coriander",
                quantity: "1 tsp"
            },

        ],
        viewers: [
            {
                id: 1,
                profilePic: images.UserProfile5
            },
            {
                id: 2,
                profilePic: images.UserProfile4
            },
            {
                id: 3,
                profilePic: images.UserProfile1
            },
            {
                id: 4,
                profilePic: images.UserProfile2
            },
            {
                id: 5,
                profilePic: images.UserProfile3
            }
        ]
    },
    {
        id: 3,
        name: "Sarawak Laksa",
        image: images.laksa,
        duration: "30 mins",
        serving: 1,
        isBookmark: true,
        category: "Local",
        author: {
            profilePic: images.UserProfile9,
            name: "Jessie",
        },
        ingredients: [
            {
                id: 1,
                icon: icons.garlic,
                description: "Garlic cloves",
                quantity: "3"
            },
            {
                id: 2,
                icon: icons.lemongrass,
                description: "Lemongrass",
                quantity: "2 stalks"
            },
            {
                id: 3,
                icon: icons.egg,
                description: "Egg",
                quantity: "2"
            },
            {
                id: 4,
                icon: icons.shrimp,
                description: "Fresh Shrimp",
                quantity: "100g"
            },
            {
                id: 5,
                icon: icons.shallot,
                description: "Shallot",
                quantity: "4"
            },
            {
                id: 6,
                icon: icons.pasta,
                description: "vermicelli",
                quantity: "100g"
            },


        ],
        viewers: [
            {
                id: 1,
                name: "User 1",
                profilePic: images.UserProfile1
            },
            {
                id: 2,
                name: "User 2",
                profilePic: images.UserProfile2
            },
            {
                id: 3,
                name: "User 3",
                profilePic: images.UserProfile3
            }
        ]
    },
    {
        id: 4,
        name: "Nasi Lemak",
        image: images.nasiLemak,
        duration: "1 hour",
        serving: 10,
        isBookmark: true,
        category: "Local",
        author: {
            profilePic: images.UserProfile7,
            name: "Ali Baba",
        },
        ingredients: [
            {
                id: 1,
                icon: icons.chilli,
                description: "Dried Chilli",
                quantity: "30g"
            },
            {
                id: 2,
                icon: icons.garlic,
                description: "Garlic cloves",
                quantity: "3"
            },
            {
                id: 3,
                icon: icons.egg,
                description: "Egg",
                quantity: "10"
            },
            {
                id: 4,
                icon: icons.rice,
                description: "rice",
                quantity: "1kg"
            },
            {
                id: 5,
                icon: icons.anchovy,
                description: "Dried anchovies",
                quantity: "3 cups"
            },


        ],
        viewers: [

        ]
    },

]

const categoriess = trendingRecipes

export default {
    myProfile,
    categories,
    menu,
    trendingRecipes,
    categoriess
}