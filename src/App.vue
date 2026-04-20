<template>
  <div id="app-layout">
    
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />

    
    <ul>
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input type="radio" :value="temp" v-model="beverageStore.currentTemp" /> {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in beverageStore.bases" :key="base.id">
          <label>
            <input type="radio" :value="base" v-model="beverageStore.currentBase" /> {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in beverageStore.creamers" :key="creamer.id">
          <label>
            <input type="radio" :value="creamer" v-model="beverageStore.currentCreamer" /> {{ creamer.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in beverageStore.syrups" :key="syrup.id">
          <label>
            <input type="radio" :value="syrup" v-model="beverageStore.currentSyrup" /> {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>

    
    <div>
      <button v-if="!user" @click="withGoogle">Sign in with Google</button>
      <div v-else>
        <p>Signed in as {{ user.displayName || user.email }}</p>
        <button @click="handleSignOut">Sign out</button>
      </div>
    </div>

    
    <input type="text" v-model="beverageStore.currentName" placeholder="Beverage Name" :disabled="!user" />
    <button @click="handleMakeBeverage" :disabled="!user">🍺 Make Beverage</button>

    
    <p v-if="!user">Please sign in to save your beverage.</p>

    
    <div v-if="user" id="beverage-container">
      <h3>Saved Recipes</h3>
      <div v-if="beverageStore.beverages.length === 0">No recipes saved yet!</div>
      <ul>
        <li v-for="bev in beverageStore.beverages" :key="bev.id">
          <button @click="beverageStore.showBeverage(bev)">{{ bev.name }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import { auth } from "./firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

const beverageStore = useBeverageStore();
const user = ref<User | null>(null);


beverageStore.init();


onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    beverageStore.setUser(currentUser);
  });
});

const withGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error("Failed to sign in:", error.message);
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Failed to sign out:", error.message);
  }
};

const handleMakeBeverage = async () => {
  const message = await beverageStore.makeBeverage();
  alert(message);
};
</script>

<style lang="scss">
body, html {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul { list-style: none; color: white; }
label { margin-right: 10px; cursor: pointer; }

.auth-section {
  text-align: center;
  margin: 15px 0;
  color: white;

  p {
    margin: 0 0 10px 0;
    font-weight: bold;
  }

  .sign-in-btn, .sign-out-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      opacity: 0.8;
    }
  }

  .sign-in-btn {
    background-color: #4285f4;
    color: white;
  }

  .sign-out-btn {
    background-color: #db4437;
    color: white;
  }
}

input[type="text"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.signin-message {
  color: white;
  font-size: 16px;
  margin-top: 15px;
}
</style>