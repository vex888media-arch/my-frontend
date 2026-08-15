<template>
  <div class="min-h-screen bg-neutral-950 text-white max-w-md mx-auto flex flex-col justify-between font-sans select-none">
    
    <!-- Step 1: Email 驗證登入頁面 -->
    <div v-if="!isLoggedIn" class="flex-1 flex flex-col justify-center px-6 py-12">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 mx-auto flex items-center justify-center font-black text-black text-2xl shadow-xl shadow-yellow-500/20 mb-4">
          GP
        </div>
        <h2 class="text-2xl font-black bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          GPCA 尊榮卡包系統
        </h2>
        <p class="text-xs text-neutral-400 mt-2">為保障資金安全，請完成信箱身份驗證</p>
      </div>

      <div class="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <!-- 信箱輸入 -->
        <div>
          <label class="block text-xs text-neutral-400 mb-1.5 font-medium">電子信箱</label>

```bash
          <input 
            v-model="email" 
            type="email" 
            placeholder="name@example.com"
            class="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
          />
        </div>

        <!-- 驗證碼輸入 + 發送按鈕 -->
        <div>
          <label class="block text-xs text-neutral-400 mb-1.5 font-medium">信箱驗證碼</label>
          <div class="flex space-x-2">
            <input 
              v-model="otpCode" 
              type="text" 
              maxlength="6"
              placeholder="6 位數字驗證碼"
              class="flex-1 bg-neutral-950 border border-neutral-700 focus:border-yellow-500 text-white rounded-xl px-4 py-3 text-sm font-mono tracking-widest outline-none transition-all"
            />
            <button 
              @click="sendOtp"
              :disabled="countdown > 0 || !email"
              class="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-yellow-400 text-xs font-bold whitespace-nowrap transition-all disabled:opacity-50"
            >
              {{ countdown > 0 ? `${countdown}s` : '發送驗證碼' }}
            </button>
          </div>
        </div>

        <!-- 登入按鈕 -->
        <button 
          @click="handleLogin"
          :disabled="!email || !otpCode || loginLoading"
          class="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-black font-extrabold text-sm tracking-wider shadow-lg shadow-yellow-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span v-if="loginLoading" class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></span>
          <span>{{ loginLoading ? '驗證中...' : '安全登入系統' }}</span>
        </button>
      </div>
    </div>

    <!-- Step 2: 登入後的系統主頁面 -->
    <div v-else class="flex-1 flex flex-col justify-between pb-20">
      
      <!-- Top Navigation Header -->
      <div class="px-4 py-3 bg-neutral-900/60 border-b border-neutral-800 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div class="flex items-center space-x-2">
          <div class="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-xs">GP</div>
          <span class="font-bold text-sm bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">GPCA VIP</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-[11px] text-neutral-400 font-mono">{{ truncatedEmail }}</span>
          <button @click="logout" class="text-[10px] px-2 py-1 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700">登出</button>
        </div>
      </div>

      <!-- Main Tab Content -->
      <div class="p-4 flex-1">
        
        <!-- Tab 1: 首頁 (匯率與公鏈資產) -->
        <div v-if="activeTab === 'home'" class="space-y-4">
          <div class="text-xs text-neutral-400 font-medium px-1">即時行情與公鏈匯率</div>
          
          <!-- 幣安鏈 (BSC / BEP20) -->
          <div class="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-black text-xs">
                BSC
              </div>
              <div>
                <p class="font-bold text-sm">幣安智能鏈 (BEP20)</p>
                <p class="text-xs text-neutral-400">BNB Gas Fee: ~0.0005 BNB</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold font-mono text-yellow-400">1.00 USDT</p>
              <span class="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400">正常運行</span>
            </div>
          </div>

          <!-- 波場鏈 (TRON / TRC20) -->
          <div class="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-black text-xs">
                TRX
              </div>
              <div>
                <p class="font-bold text-sm">波場公鏈 (TRC20)</p>
                <p class="text-xs text-neutral-400">TRX Energy: Fast</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold font-mono text-yellow-400">1.00 USDT</p>
              <span class="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400">正常運行</span>
            </div>
          </div>

          <!-- 美金與法幣匯率 (USD Rate) -->
          <div class="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-black text-xs">
                USD
              </div>
              <div>
                <p class="font-bold text-sm">美金法幣參考匯率</p>
                <p class="text-xs text-neutral-400">USD / TWD / CNY</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold font-mono text-green-400">$1.00 USD</p>
              <p class="text-xs text-neutral-400">≈ 32.5 TWD</p>
            </div>
          </div>
        </div>

        <!-- Tab 2: 開卡/卡片管理 -->
        <div v-if="activeTab === 'card'" class="space-y-4">
          <div class="w-full aspect-[1.586/1] rounded-2xl p-6 border border-yellow-500/40 shadow-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-[10px] text-neutral-400 uppercase">GPCA BLACK CARD</p>
                <p class="text-xs font-semibold text-yellow-400">PREMIUM ISSUING</p>
              </div>
              <div class="w-9 h-7 rounded bg-gradient-to-r from-yellow-300 to-yellow-600"></div>
            </div>
            <p class="text-lg font-mono font-bold text-yellow-400">•••• •••• •••• 8888</p>
            <div class="flex justify-between text-xs text-neutral-300">
              <span>{{ email }}</span>
              <span>12/29</span>
            </div>
          </div>
        </div>

        <!-- Tab 3: 客服支援 -->
        <div v-if="activeTab === 'support'" class="text-center py-12 space-y-4">
          <p class="text-sm text-neutral-400">1-on-1 專屬尊榮客戶經理</p>
          <a href="[https://t.me/gbcbreakingnews777](https://t.me/gbcbreakingnews777)" target="_blank" class="inline-block px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold">
            聯繫 Telegram 客服
          </a>
        </div>

      </div>

      <!-- Bottom Tab Bar -->
      <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-neutral-900/95 border-t border-neutral-800 flex justify-around py-3 backdrop-blur-lg z-50">
        <button @click="activeTab = 'home'" :class="['flex flex-col items-center text-xs font-medium', activeTab === 'home' ? 'text-yellow-400' : 'text-neutral-500']">
          <span>首頁匯率</span>
        </button>
        <button @click="activeTab = 'card'" :class="['flex flex-col items-center text-xs font-medium', activeTab === 'card' ? 'text-yellow-400' : 'text-neutral-500']">
          <span>卡包管理</span>
        </button>
        <button @click="activeTab = 'support'" :class="['flex flex-col items-center text-xs font-medium', activeTab === 'support' ? 'text-yellow-400' : 'text-neutral-500']">
          <span>尊榮客服</span>
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const otpCode = ref('')
const countdown = ref(0)
const isLoggedIn = ref(false)
const loginLoading = ref(false)
const activeTab = ref('home')

const truncatedEmail = computed(() => {
  if (!email.value) return ''
  const [name, domain] = email.value.split('@')
  return `${name.slice(0, 3)}...@${domain}`
})

const sendOtp = () => {
  if (!email.value) return
  alert(`驗證碼已發送至 ${email.value}`)
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

const handleLogin = () => {
  if (!email.value || !otpCode.value) return
  loginLoading.value = true
  setTimeout(() => {
    loginLoading.value = false
    isLoggedIn.value = true
  }, 1000)
}

const logout = () => {
  isLoggedIn.value = false
  otpCode.value = ''
}
</script>
