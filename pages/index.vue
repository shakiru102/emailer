<template>
    <div class="">
      <v-snackbar
      top
      dark
      :color="color"
        v-model="handleBar"
      >
        <span>{{ message }}</span>
        <v-btn x-small text absolute right color="primary" @click.native="handleBar = false">Close</v-btn>
      </v-snackbar>
          <v-container class="">
          <v-form 
          v-model="valid"
          @submit="handleSubmit"
          >
            <v-col align="center">
              <v-card
                  class="form_card"
                >

                <v-img  class="form_image" :src="require('@/assets/mail.jpg')"></v-img>
                
                    
                  <v-card-text class="pa-10">
                    <v-row>
                        <v-text-field color="gray" v-model="email" type="email" required 
                        label="Email"
                        :rules="[
                        v => !!v || 'Email is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                        ]"
                          filled  ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                        v-model="subject"
                        :rules="[v => !!v || 'Subject is required']"
                          color="gray" type="text" required 
                          label="Subject" filled   ></v-text-field>
                    </v-row>
                    <v-row>
                          <v-textarea
                          v-model="text"
                          :rules="[v => !!v || 'Message is required']"
                          color="gray"
                          :no-resize="true"
                                  outlined
                                  required
                                  placeholder="Message"
                                ></v-textarea> 
                    </v-row>
                      <v-row>
                    <v-btn
                      block
                      :disabled="!valid"
                      :loading="loading"
                      color="#E57373"
                      type="submit"
                    >
                    send
                    </v-btn>
                  </v-row>
                  </v-card-text>
                </v-card>
                <div class=" orange--text text-left py-3">
                    <span class="text"></span><span class="white--text underscore" >_</span>
                    </div>
            </v-col>
          </v-form>
        </v-container>
    </div>
</template>
<script>
export default {
  data: () => ({
    email:'',
    subject: '',
    text: '',
    loading: false,
    handleBar: false,
    color: '',
    message: '',
    valid: true, 
    words: ['Hi there.', 'Send a message with...', 'ashakiru53@gmail.com', 'Thank you very much']
  }),
  mounted(){
    gsap.to('.underscore', { opacity: 0, repeat: -1, yoyo: true, ease: 'power', duration: 0.3})
    let masterline = gsap.timeline({ repeat: -1})
    this.words.forEach( word => {
      let tl = gsap.timeline({ yoyo: true, repeat: 1,  repeatDelay: 1,})
          tl.to('.text', { text:word , duration: 1 })

          masterline.add(tl)
          
    })
  },
  methods: {
   handleSubmit(e){
      e.preventDefault()
      this.loading = true
       this.$axios.$post('/serverMiddleware/sendmail', { email: this.email, subject: this.subject, text: this.text})
      .then(()=> {
        this.color = "success"
        this.message = "message sent successfully"
        this.handleBar = true
        this.loading = false
      })
      .catch( err => {
        this.color = "error"
        this.message = "message was not sent "
        this.handleBar = true
        this.loading = false
        console.log(err.message)
      })
    }
  }
  
}
</script>
<style scoped>
.form_card.v-card{
  width: 40%;
}
.form_image{
  height: 100px;
}
@media screen and (max-width: 768px) {
   .form_card.v-card{
     width: 100%;
   }
   
}
</style>