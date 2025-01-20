import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';  // Import the cart slice
import productReducer from './features/productSlice'; // Import product slice
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,  // Include cart slice in the Redux store
    products: productReducer,  // Add product reducer to the store
    user: userReducer,
  },
});

export default store;




// {
//   "units": [
//     { "id": "unit1", "name": "Awakening the Mind" },
//     { "id": "unit2", "name": "Understanding Consciousness" },
//     { "id": "unit3", "name": "The Power of Detachment" },
//     { "id": "unit4", "name": "Journey to Inner Peace" },
//     { "id": "unit5", "name": "True Self and Identity" },
//     { "id": "unit6", "name": "Embracing the Present Moment" },
//     { "id": "unit7", "name": "Path of Self-Realization" },
//     { "id": "unit8", "name": "Love and Compassion" },
//     { "id": "unit9", "name": "Enlightenment and Beyond" }
//   ]
// }


// {
//   "levels": [
//     { "id": "level1", "unitId": "unit1", "name": "Introduction to Awareness" },
//     { "id": "level2", "unitId": "unit1", "name": "The Nature of Thoughts" },
//     { "id": "level3", "unitId": "unit1", "name": "Observing the Mind" },
//     { "id": "level4", "unitId": "unit1", "name": "Self vs. Ego" },
//     { "id": "level5", "unitId": "unit1", "name": "Developing Mindfulness" },
//     { "id": "level6", "unitId": "unit1", "name": "Quieting Mental Chatter" },
//     { "id": "level7", "unitId": "unit1", "name": "Discovering Inner Silence" },
//     { "id": "level8", "unitId": "unit2", "name": "Layers of Consciousness" },
//     { "id": "level9", "unitId": "unit2", "name": "Conscious vs. Subconscious Mind" },
//     { "id": "level10", "unitId": "unit2", "name": "Awakening to the Present" },
//     { "id": "level11", "unitId": "unit2", "name": "Becoming the Observer" },
//     { "id": "level12", "unitId": "unit2", "name": "Higher States of Awareness" },
//     { "id": "level13", "unitId": "unit2", "name": "Expanding Inner Vision" },
//     { "id": "level14", "unitId": "unit2", "name": "Conscious Living" },
//     { "id": "level15", "unitId": "unit3", "name": "Understanding Attachment" },
//     { "id": "level16", "unitId": "unit3", "name": "Attachment vs. Love" },
//     { "id": "level17", "unitId": "unit3", "name": "Letting Go of Desires" },
//     { "id": "level18", "unitId": "unit3", "name": "Finding Freedom in Detachment" },
//     { "id": "level19", "unitId": "unit3", "name": "Releasing the Past" },
//     { "id": "level20", "unitId": "unit3", "name": "Balancing Love and Freedom" },
//     { "id": "level21", "unitId": "unit3", "name": "Experiencing Detachment as Liberation" },
//     { "id": "level22", "unitId": "unit4", "name": "Defining Inner Peace" },
//     { "id": "level23", "unitId": "unit4", "name": "Finding Stillness Within" },
//     { "id": "level24", "unitId": "unit4", "name": "Overcoming Mental Restlessness" },
//     { "id": "level25", "unitId": "unit4", "name": "Acceptance and Letting Go" },
//     { "id": "level26", "unitId": "unit4", "name": "Harmony with Change" },
//     { "id": "level27", "unitId": "unit4", "name": "Cultivating Compassion" },
//     { "id": "level28", "unitId": "unit4", "name": "Living in Peaceful Presence" },
//     { "id": "level29", "unitId": "unit5", "name": "Ego vs. True Self" },
//     { "id": "level30", "unitId": "unit5", "name": "The Masks We Wear" },
//     { "id": "level31", "unitId": "unit5", "name": "Discovering the Inner Self" },
//     { "id": "level32", "unitId": "unit5", "name": "Self-Inquiry Techniques" },
//     { "id": "level33", "unitId": "unit5", "name": "Being Authentic" },
//     { "id": "level34", "unitId": "unit5", "name": "Finding Purpose" },
//     { "id": "level35", "unitId": "unit5", "name": "Embracing the Unknown Self" },
//     { "id": "level36", "unitId": "unit6", "name": "The Essence of Now" },
//     { "id": "level37", "unitId": "unit6", "name": "Recognizing Present Awareness" },
//     { "id": "level38", "unitId": "unit6", "name": "Releasing the Past" },
//     { "id": "level39", "unitId": "unit6", "name": "Breaking Free from Future Worries" },
//     { "id": "level40", "unitId": "unit6", "name": "Joy in the Present" },
//     { "id": "level41", "unitId": "unit6", "name": "Everyday Mindfulness" },
//     { "id": "level42", "unitId": "unit6", "name": "Sustaining Present Awareness" },
//     { "id": "level43", "unitId": "unit7", "name": "Beginning the Inner Journey" },
//     { "id": "level44", "unitId": "unit7", "name": "Questioning Reality" },
//     { "id": "level45", "unitId": "unit7", "name": "Seeing Beyond the Physical" },
//     { "id": "level46", "unitId": "unit7", "name": "Mystical Experiences" },
//     { "id": "level47", "unitId": "unit7", "name": "The Role of Meditation" },
//     { "id": "level48", "unitId": "unit7", "name": "Inner Silence as Guidance" },
//     { "id": "level49", "unitId": "unit7", "name": "Self-Realization as Freedom" },
//     { "id": "level50", "unitId": "unit8", "name": "Self-Love and Acceptance" },
//     { "id": "level51", "unitId": "unit8", "name": "Compassion for Others" },
//     { "id": "level52", "unitId": "unit8", "name": "Love without Possession" },
//     { "id": "level53", "unitId": "unit8", "name": "Letting Go of Judgment" },
//     { "id": "level54", "unitId": "unit8", "name": "Compassionate Communication" },
//     { "id": "level55", "unitId": "unit8", "name": "Experiencing Oneness" },
//     { "id": "level56", "unitId": "unit8", "name": "Love as the Essence of Being" },
//     { "id": "level57", "unitId": "unit9", "name": "What is Enlightenment?" },
//     { "id": "level58", "unitId": "unit9", "name": "Letting Go of Illusions" },
//     { "id": "level59", "unitId": "unit9", "name": "Experiencing Wholeness" },
//     { "id": "level60", "unitId": "unit9", "name": "Unity of Mind, Body, and Spirit" },
//     { "id": "level61", "unitId": "unit9", "name": "Conscious Connection to All" },
//     { "id": "level62", "unitId": "unit9", "name": "Living with Inner Truth" },
//     { "id": "level63", "unitId": "unit9", "name": "Embracing the Infinite" }
//   ]
// }
