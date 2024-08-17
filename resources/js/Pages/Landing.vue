

<template>
  <div class="min-h-screen  flex  sm:justify-center items-center pt-6 sm:pt-0 bg-gray-200">

        <Card class="w-full sm:w-2/3">
          <div class="flex flex-row " >
            <div class="w-1/2 flex flex-col items-center justify-center hidden sm:flex md:flex">
              <!-- <Avatar >
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> -->
              <img src="https://static.vecteezy.com/system/resources/thumbnails/007/721/351/small_2x/work-from-home-illustration-concept-man-working-on-laptop-at-home-vector.jpg"/>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/2 flex flex-col m-3 ">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to access your account and enjoy our features.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div class="grid items-center w-full gap-4">
                    <div class="flex flex-col space-y-1.5">
                      <Label for="email">Email</Label>
                      <Input id="email" placeholder="Email" type="email" v-model="formData.email"/>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                      <Label for="password">Password</Label>
                        <Input id="password" placeholder="Password" type="password" v-model="formData.password"/>
                    </div>
                    <div class="flex flex-row">
                      <div class="flex flex-col">
                        <div class="flex space-x-2 items-center">
                          <Checkbox id="terms" v-model="formData.checkbox_remember_me" />
                          <label
                            for="terms"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      
                      <div class="flex flex-col ml-auto justify-center">
                        <a href="#" >
                          <p class="text-sm text-orange-500">
                            Forget Password?
                          </p>
                        </a>
                      </div>
                    </div>

                    
                  </div>
                </form>
              </CardContent>
              <!-- <CardFooter class=" justify-center px-6 pb-6"> -->
                <!-- <Button variant="outline">
                  Cancel
                </Button> -->
                <div class="p-5">
                  <Button class="w-full" type="submit" @click="LoginFunc()">Login</Button>
                  <Button variant="outline" class="flex w-full mt-3">
                    <!-- <Avatar class="p-3"> -->
                      <img class="w-6 h-auto" 
                        src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" 
                        alt="Google Logo" />
                    <!-- </Avatar> -->
                    <!-- <span class="ml-2  hidden sm:inline text text-sm"> -->
                      <p class="ml-2  hidden sm:inline text text-sm">
                        Login With Google

                      </p>
                    <!-- </span> -->
                  </Button>
                </div>
                
              <!-- </CardFooter> -->
            </div>
          </div>

          
        </Card>
    
  </div>
  
</template>

<script setup lang='ts'>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Button } from '@/Components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Checkbox } from '@/Components/ui/checkbox'
import { computed } from 'vue';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { useRouter} from 'vue-router';


const formData = reactive({
  email: '',
  password: '',
  checkbox_remember_me: false
});

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user);

function LoginFunc() {
  // console.log(formData)
console.log(router.getRoutes());

  store.dispatch('auth/store', formData)
    .then((response) => {
      console.log('Item saved successfully:', response);
      router.push({ name: 'Dashboard' });
    })
    .catch((error) => {
      console.error('Error saving item:', error);
    });
}

</script>