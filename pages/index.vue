  <template>
      <div :class="{'dark': darkMode}">
        
    
        <LoadingPage v-if="isAuthLoading" />
          
    
        <!-- APP -->
    
        <div  v-else-if="user" class="min-h-full">
    
    
          <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
    
            <!-- LEFT SIDE BAR -->
    
            <div class="border-2 border-red-500 md:block xs-col-span-1 xl:col-span-2">
              <div class="sticky top-0">
                <SidebarLeft/>
              </div>
            </div>
    
    
    
            <!-- Main content -->
            <main class="col-span-12 bg-red-500 md:col-span-8 xl:col-span-6">
              <div>
                  <MainSection title="Home" :loading="loading">
                      {{ user.username }}
                      
                  </MainSection>

                  <NuxtLink to="/room/CreateRoom">
                    Créer une room
                </NuxtLink>

                <div>
                  <h2>Mes Salles</h2>
                  <ul>
                    <li v-for="room in rooms" :key="room.id">
                      {{ room.name }}
                    </li>
                  </ul>
                </div>

              </div>
            </main>
    
            <!-- RIGHT SideBar -->
    
          </div>
    
        </div>
    
        <AuthPage v-else/>
    
      </div>
    </template>
    <script setup>

    import { useRouter } from 'vue-router'
    import Cookies from 'js-cookie'

  

    const darkMode = ref(false)
    const {useAuthUser, initAuth, useAuthLoading} = useAuth()
    const user = useAuthUser()
    const isAuthLoading = useAuthLoading()
    const router = useRouter()
    
    onBeforeMount(() => {
      initAuth()
    })


    onMounted(async () => {
  try {
    const userId = user.value.id;
    const userRooms = await getRoomsByUserId(userId);
    rooms.value = userRooms.map(userRoom => userRoom.room);
  } catch (error) {
    console.error('Erreur lors de la récupération des salles de l\'utilisateur :', error);
  }
});
      </script>

