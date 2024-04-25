

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

                {{ room.name }}

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



    import { useRoom } from '~/composables';

    const room = ref(null);

    const { getRoom } = useRoom(); /

    onMounted(async () => {
      try {
      
        room.value = await getRoom();
      } catch (error) {
        console.error(error.message);
      }
    });

      </script>

