'use client'

import { useState } from 'react'
import { Star, Clock, ThumbsUp } from 'lucide-react'
import { ScrollReveal } from '@/components/landing/scroll-reveal'

const platforms = [
  {
    id: 'google',
    name: 'Google',
    color: '#4285F4',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: 'yelp',
    name: 'Yelp',
    color: '#FF1A1A',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#FF1A1A">
        <path d="m7.6885 15.1415-3.6715.8483c-.3769.0871-.755.183-1.1452.155-.2611-.0188-.5122-.0414-.7606-.213a1.179 1.179 0 0 1-.331-.3594c-.3486-.5519-.3656-1.3661-.3697-2.0004a6.2874 6.2874 0 0 1 .3314-2.0642 1.857 1.857 0 0 1 .1073-.2474 2.3426 2.3426 0 0 1 .1255-.2165 2.4572 2.4572 0 0 1 .1563-.1975 1.1736 1.1736 0 0 1 .399-.2831 1.082 1.082 0 0 1 .4592-.0837c.2355.0016.5139.052.91.1734.0555.0191.1237.0382.1856.0572.3277.1013.7048.2404 1.1499.3987.6863.2404 1.3663.487 2.0463.7397l1.2117.4423c.2217.0807.4363.18.6412.297.174.0984.3273.2298.4512.387a1.217 1.217 0 0 1 .192.4309 1.2205 1.2205 0 0 1-.872 1.4522c-.0468.0151-.0852.0239-.1085.0293l-1.105.2553zM18.8208 7.565a1.8506 1.8506 0 0 0-.2042-.1754 2.4082 2.4082 0 0 0-.2077-.1394 2.3607 2.3607 0 0 0-.2269-.109 1.1705 1.1705 0 0 0-.482-.0796 1.0862 1.0862 0 0 0-.4498.1263c-.2107.1048-.4388.2732-.742.5551-.042.0417-.0947.0886-.142.133-.2502.2351-.5286.5252-.8599.863a114.6363 114.6363 0 0 0-1.5166 1.5629l-.8962.9293a4.1897 4.1897 0 0 0-.4466.5483 1.541 1.541 0 0 0-.2364.5459 1.2199 1.2199 0 0 0 .0107.4518l.0046.02a1.218 1.218 0 0 0 1.4184.923 1.162 1.162 0 0 0 .1105-.0213l4.7781-1.104c.3766-.087.7587-.1667 1.097-.3631.2269-.1316.4428-.262.5909-.5252a1.1793 1.1793 0 0 0 .1405-.4683c.0733-.6512-.2668-1.3908-.5403-1.963a6.2792 6.2792 0 0 0-1.2001-1.7103zM8.9703.0754a8.6724 8.6724 0 0 0-.83.1564c-.2754.066-.548.1383-.8146.2236-.868.2844-2.0884.8063-2.295 1.8065-.1165.5655.1595 1.1439.3737 1.66.2595.6254.614 1.1889.9373 1.7777.8543 1.5545 1.7245 3.0993 2.5922 4.6457.259.4617.5416 1.0464 1.043 1.2856a1.058 1.058 0 0 0 .1013.0383c.2248.0851.4699.1016.7041.0471a4.3015 4.3015 0 0 0 .0418-.0097 1.2136 1.2136 0 0 0 .5658-.3397 1.1033 1.1033 0 0 0 .079-.0822c.3463-.435.3454-1.0833.3764-1.6134.1042-1.771.2139-3.5423.3009-5.3142.0332-.6712.1055-1.3333.0655-2.0096-.0328-.5579-.0368-1.1984-.3891-1.6563-.6218-.8073-1.9476-.741-2.8523-.6158zm2.084 15.9505a1.1053 1.1053 0 0 0-1.2306-.4145 1.1398 1.1398 0 0 0-.1526.0633 1.4806 1.4806 0 0 0-.2171.1354c-.1992.1475-.3668.3392-.5196.5315-.0386.049-.074.1143-.12.1562l-.7686 1.0573a113.9168 113.9168 0 0 0-1.2913 1.789c-.278.3895-.5184.7184-.7083 1.0094-.036.0547-.0734.116-.1075.1647-.2277.3522-.3566.6092-.4228.8381a1.0945 1.0945 0 0 0-.046.4721c.0211.1655.0768.3246.1635.467.046.0715.0957.1406.1487.207a2.334 2.334 0 0 0 .1754.1825 1.843 1.843 0 0 0 .2108.1732c.5304.369 1.1112.6342 1.722.8391a6.0958 6.0958 0 0 0 1.5716.3004c.091.0046.1821.0025.2728-.006a2.3878 2.3878 0 0 0 .2506-.0351 2.3862 2.3862 0 0 0 .2447-.071 1.1927 1.1927 0 0 0 .4175-.2658c.1127-.113.1994-.249.2541-.3989.0889-.2214.1473-.5026.1857-.92.0034-.0593.0118-.1305.0177-.1958.0304-.3463.0443-.7531.0666-1.2315.0375-.7357.067-1.4681.0903-2.2026 0 0 .0495-1.3053.0494-1.306.0113-.3008.002-.6342-.0814-.9336a1.396 1.396 0 0 0-.1756-.4054zm8.6754 2.0439c-.1605-.176-.3878-.3514-.7462-.5682-.0518-.0288-.1124-.0674-.1684-.1009-.2985-.1795-.658-.3684-1.078-.5965a120.7615 120.7615 0 0 0-1.9427-1.042l-1.1515-.6107c-.0597-.0175-.1203-.0607-.1766-.0878-.2212-.1058-.4558-.2045-.6992-.2498a1.4915 1.4915 0 0 0-.2545-.0265 1.1527 1.1527 0 0 0-.1648.01 1.1077 1.1077 0 0 0-.9227.9133 1.4186 1.4186 0 0 0 .0159.439c.0563.3065.1932.6096.3346.875l.615 1.1526c.3422.65.6884 1.2963 1.0435 1.9406.229.4202.4196.7799.5982 1.078.0338.056.0721.1163.1011.1682.2173.3584.392.584.569.7458.1146.1107.252.195.4026.247.1583.0525.326.071.4919.0546a2.368 2.368 0 0 0 .251-.0435c.0817-.022.1622-.048.241-.0784a1.863 1.863 0 0 0 .2475-.1143 6.1018 6.1018 0 0 0 1.2818-.9597c.4596-.4522.8659-.9454 1.182-1.51.044-.08.0819-.163.1138-.2483a2.49 2.49 0 0 0 .0773-.2411c.0186-.083.033-.1669.0429-.2513a1.188 1.188 0 0 0-.0565-.491 1.0933 1.0933 0 0 0-.248-.4041z"/>
      </svg>
    ),
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    color: '#00852f',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#00852f">
        <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
      </svg>
    ),
  },
  {
    id: 'trustpilot',
    name: 'Trustpilot',
    color: '#00B67A',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#00B67A">
        <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z"/>
      </svg>
    ),
  },
  {
    id: 'booking',
    name: 'Booking.com',
    color: '#003580',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#003580">
        <path d="M24 0H0v24h24ZM8.575 6.563h2.658c2.108 0 3.473 1.15 3.473 2.898 0 1.15-.575 1.82-.91 2.108l-.287.263.335.192c.815.479 1.318 1.389 1.318 2.395 0 1.988-1.51 3.257-3.857 3.257H7.449V7.713c0-.623.503-1.126 1.126-1.15zm1.7 1.868c-.479.024-.694.264-.694.79v1.893h1.676c.958 0 1.294-.743 1.294-1.365 0-.815-.503-1.318-1.318-1.318zm-.096 4.36c-.407.071-.598.31-.598.79v2.251h1.868c.934 0 1.509-.55 1.509-1.533 0-.934-.599-1.509-1.51-1.509zm7.737 2.394c.743 0 1.341.599 1.341 1.342a1.34 1.34 0 0 1-1.341 1.341 1.355 1.355 0 0 1-1.341-1.341c0-.743.598-1.342 1.34-1.342z"/>
      </svg>
    ),
  },
]

function GoogleStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= count ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  )
}

const yelpColors: Record<number, string> = {
  1: '#FFCC33',
  2: '#FFAD1D',
  3: '#FF8C00',
  4: '#F26A2E',
  5: '#FF1A1A',
}

function YelpStars({ count }: { count: number }) {
  const color = yelpColors[count] || '#D32323'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-[18px] h-[18px] rounded-[3px] flex items-center justify-center"
          style={{ backgroundColor: i <= count ? color : '#E0E0E0' }}
        >
          <svg className="w-3 h-3" viewBox="0 0 18 18" fill="white">
            <path d="M9 1.5l2.47 4.55 5.03.95-3.52 3.73.64 5.02L9 13.77l-4.62 2.98.64-5.02L1.5 7 6.53 6.05z"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

function GoogleDemo() {
  return (
    <>
      <p className="text-center text-sm text-gray-500 mb-6">
        Voici ce que vos clients voient sur Google :
      </p>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-white px-5 py-3 flex items-center gap-2 border-b">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-semibold text-gray-700">Avis Google</span>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">JD</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900">Jean Dupont</span>
                  <span className="text-xs text-gray-400">Il y a 2 jours</span>
                </div>
                <div className="my-1"><GoogleStars count={5} /></div>
                <p className="text-gray-700 text-sm">Excellent pain au levain, croustillant à souhait ! Le personnel est très accueillant. Je recommande vivement cette boulangerie.</p>
                <div className="mt-4 ml-2 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">BM</div>
                    <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                    <span className="text-[10px] text-gray-400">Propriétaire</span>
                  </div>
                  <p className="text-sm text-gray-600">Merci beaucoup Jean ! Nous sommes ravis que notre pain au levain vous plaise, c&apos;est notre fierté. Votre recommandation nous touche sincèrement. À très bientôt !</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">MP</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900">Marie Petit</span>
                  <span className="text-xs text-gray-400">Il y a 5 heures</span>
                </div>
                <div className="my-1"><GoogleStars count={2} /></div>
                <p className="text-gray-700 text-sm">Déçue par l&apos;attente, 20 minutes pour un croissant. Le produit est bon mais le service laisse à désirer.</p>
                <div className="mt-4 ml-2 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">BM</div>
                    <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                    <span className="text-[10px] text-gray-400">Propriétaire</span>
                  </div>
                  <p className="text-sm text-gray-600">Bonjour Marie, nous sommes navrés pour cette attente inhabituelle. Nous renforçons notre équipe aux heures de pointe pour améliorer la rapidité. Nous espérons vous accueillir à nouveau dans de meilleures conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden ring-2 ring-blue-100">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">LB</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900">Lucas Bernard</span>
                  <span className="text-xs text-gray-400">Il y a 1 heure</span>
                </div>
                <div className="my-1"><GoogleStars count={4} /></div>
                <p className="text-gray-700 text-sm">Bons croissants mais un peu cher pour le quartier. L&apos;accueil est sympa par contre.</p>
                <div className="mt-4 ml-2 pl-4 border-l-2 border-blue-300 bg-blue-50/50 rounded-r-lg py-3 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">BM</div>
                    <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                      <Clock className="h-2.5 w-2.5" />
                      En attente de validation
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Merci Lucas pour votre retour ! Nous sommes contents que nos croissants et notre accueil vous plaisent. Nous travaillons à proposer des formules plus accessibles.</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-700">Publier la réponse</span>
                    <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Modifier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function FacebookDemo() {
  return (
    <>
      <p className="text-center text-sm text-gray-500 mb-6">
        Voici ce que vos clients voient sur Facebook :
      </p>
      <div className="space-y-4">
        {/* Facebook review card */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-[#1877F2] px-5 py-3 flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-white font-semibold text-sm">Avis Facebook</span>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">SL</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Sophie Lefèvre</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <ThumbsUp className="h-4 w-4 text-[#1877F2] fill-[#1877F2]" />
                  <span className="text-sm font-medium text-[#1877F2]">Recommande</span>
                  <span className="text-xs text-gray-400 ml-1">· Il y a 3 jours</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">Super boulangerie ! Les viennoiseries sont incroyables, surtout le pain au chocolat. Ambiance chaleureuse et service rapide. On y retourne chaque week-end.</p>
                {/* Facebook comment-style response */}
                <div className="mt-3 bg-gray-50 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">BM</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">Page</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Merci Sophie ! Votre fidélité nous fait chaud au coeur. Notre pain au chocolat est effectivement notre best-seller. À samedi prochain !</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-gray-400">J&apos;aime</span>
                        <span className="text-xs text-gray-400">Répondre</span>
                        <span className="text-xs text-gray-400">3 j</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">PD</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Pierre Durand</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm text-gray-500">Ne recommande pas</span>
                  <span className="text-xs text-gray-400 ml-1">· Il y a 1 jour</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">Croissant sec et café tiède. Pour le prix demandé, on s&apos;attend à mieux. Le cadre est joli mais ça ne suffit pas.</p>
                <div className="mt-3 bg-gray-50 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">BM</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">Page</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Bonjour Pierre, merci de votre retour. Nous prenons ces remarques au sérieux. Nous avons ajusté nos procédures pour garantir la fraîcheur de nos produits. Nous vous offrons un café lors de votre prochaine visite.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden ring-2 ring-blue-100">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">CL</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Camille Leroy</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <ThumbsUp className="h-4 w-4 text-[#1877F2] fill-[#1877F2]" />
                  <span className="text-sm font-medium text-[#1877F2]">Recommande</span>
                  <span className="text-xs text-gray-400 ml-1">· Il y a 2 heures</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">Très bon rapport qualité-prix. La baguette tradition est parfaite. Petit bémol sur les horaires, fermé trop tôt le dimanche.</p>
                <div className="mt-3 bg-blue-50/50 rounded-xl p-3 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">BM</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-900">Boulangerie Martin</span>
                        <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                          <Clock className="h-2.5 w-2.5" />
                          En attente de validation
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 mb-3">Merci Camille ! Ravie que notre baguette tradition vous plaise. Bonne nouvelle : nous étendons nos horaires du dimanche dès le mois prochain !</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1.5 bg-[#1877F2] text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-700">Publier</span>
                        <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Modifier</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function YelpDemo() {
  return (
    <>
      <p className="text-center text-sm text-gray-500 mb-6">
        Voici ce que vos clients voient sur Yelp :
      </p>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-[#FF1A1A] px-5 py-3 flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
              <path d="m7.6885 15.1415-3.6715.8483c-.3769.0871-.755.183-1.1452.155-.2611-.0188-.5122-.0414-.7606-.213a1.179 1.179 0 0 1-.331-.3594c-.3486-.5519-.3656-1.3661-.3697-2.0004a6.2874 6.2874 0 0 1 .3314-2.0642 1.857 1.857 0 0 1 .1073-.2474 2.3426 2.3426 0 0 1 .1255-.2165 2.4572 2.4572 0 0 1 .1563-.1975 1.1736 1.1736 0 0 1 .399-.2831 1.082 1.082 0 0 1 .4592-.0837c.2355.0016.5139.052.91.1734.0555.0191.1237.0382.1856.0572.3277.1013.7048.2404 1.1499.3987.6863.2404 1.3663.487 2.0463.7397l1.2117.4423c.2217.0807.4363.18.6412.297.174.0984.3273.2298.4512.387a1.217 1.217 0 0 1 .192.4309 1.2205 1.2205 0 0 1-.872 1.4522c-.0468.0151-.0852.0239-.1085.0293l-1.105.2553zM18.8208 7.565a1.8506 1.8506 0 0 0-.2042-.1754 2.4082 2.4082 0 0 0-.2077-.1394 2.3607 2.3607 0 0 0-.2269-.109 1.1705 1.1705 0 0 0-.482-.0796 1.0862 1.0862 0 0 0-.4498.1263c-.2107.1048-.4388.2732-.742.5551-.042.0417-.0947.0886-.142.133-.2502.2351-.5286.5252-.8599.863a114.6363 114.6363 0 0 0-1.5166 1.5629l-.8962.9293a4.1897 4.1897 0 0 0-.4466.5483 1.541 1.541 0 0 0-.2364.5459 1.2199 1.2199 0 0 0 .0107.4518l.0046.02a1.218 1.218 0 0 0 1.4184.923 1.162 1.162 0 0 0 .1105-.0213l4.7781-1.104c.3766-.087.7587-.1667 1.097-.3631.2269-.1316.4428-.262.5909-.5252a1.1793 1.1793 0 0 0 .1405-.4683c.0733-.6512-.2668-1.3908-.5403-1.963a6.2792 6.2792 0 0 0-1.2001-1.7103zM8.9703.0754a8.6724 8.6724 0 0 0-.83.1564c-.2754.066-.548.1383-.8146.2236-.868.2844-2.0884.8063-2.295 1.8065-.1165.5655.1595 1.1439.3737 1.66.2595.6254.614 1.1889.9373 1.7777.8543 1.5545 1.7245 3.0993 2.5922 4.6457.259.4617.5416 1.0464 1.043 1.2856a1.058 1.058 0 0 0 .1013.0383c.2248.0851.4699.1016.7041.0471a4.3015 4.3015 0 0 0 .0418-.0097 1.2136 1.2136 0 0 0 .5658-.3397 1.1033 1.1033 0 0 0 .079-.0822c.3463-.435.3454-1.0833.3764-1.6134.1042-1.771.2139-3.5423.3009-5.3142.0332-.6712.1055-1.3333.0655-2.0096-.0328-.5579-.0368-1.1984-.3891-1.6563-.6218-.8073-1.9476-.741-2.8523-.6158zm2.084 15.9505a1.1053 1.1053 0 0 0-1.2306-.4145 1.1398 1.1398 0 0 0-.1526.0633 1.4806 1.4806 0 0 0-.2171.1354c-.1992.1475-.3668.3392-.5196.5315-.0386.049-.074.1143-.12.1562l-.7686 1.0573a113.9168 113.9168 0 0 0-1.2913 1.789c-.278.3895-.5184.7184-.7083 1.0094-.036.0547-.0734.116-.1075.1647-.2277.3522-.3566.6092-.4228.8381a1.0945 1.0945 0 0 0-.046.4721c.0211.1655.0768.3246.1635.467.046.0715.0957.1406.1487.207a2.334 2.334 0 0 0 .1754.1825 1.843 1.843 0 0 0 .2108.1732c.5304.369 1.1112.6342 1.722.8391a6.0958 6.0958 0 0 0 1.5716.3004c.091.0046.1821.0025.2728-.006a2.3878 2.3878 0 0 0 .2506-.0351 2.3862 2.3862 0 0 0 .2447-.071 1.1927 1.1927 0 0 0 .4175-.2658c.1127-.113.1994-.249.2541-.3989.0889-.2214.1473-.5026.1857-.92.0034-.0593.0118-.1305.0177-.1958.0304-.3463.0443-.7531.0666-1.2315.0375-.7357.067-1.4681.0903-2.2026 0 0 .0495-1.3053.0494-1.306.0113-.3008.002-.6342-.0814-.9336a1.396 1.396 0 0 0-.1756-.4054zm8.6754 2.0439c-.1605-.176-.3878-.3514-.7462-.5682-.0518-.0288-.1124-.0674-.1684-.1009-.2985-.1795-.658-.3684-1.078-.5965a120.7615 120.7615 0 0 0-1.9427-1.042l-1.1515-.6107c-.0597-.0175-.1203-.0607-.1766-.0878-.2212-.1058-.4558-.2045-.6992-.2498a1.4915 1.4915 0 0 0-.2545-.0265 1.1527 1.1527 0 0 0-.1648.01 1.1077 1.1077 0 0 0-.9227.9133 1.4186 1.4186 0 0 0 .0159.439c.0563.3065.1932.6096.3346.875l.615 1.1526c.3422.65.6884 1.2963 1.0435 1.9406.229.4202.4196.7799.5982 1.078.0338.056.0721.1163.1011.1682.2173.3584.392.584.569.7458.1146.1107.252.195.4026.247.1583.0525.326.071.4919.0546a2.368 2.368 0 0 0 .251-.0435c.0817-.022.1622-.048.241-.0784a1.863 1.863 0 0 0 .2475-.1143 6.1018 6.1018 0 0 0 1.2818-.9597c.4596-.4522.8659-.9454 1.182-1.51.044-.08.0819-.163.1138-.2483a2.49 2.49 0 0 0 .0773-.2411c.0186-.083.033-.1669.0429-.2513a1.188 1.188 0 0 0-.0565-.491 1.0933 1.0933 0 0 0-.248-.4041z"/>
            </svg>
            <span className="text-white font-semibold text-sm">Yelp</span>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AR</div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-gray-900">Amélie Rousseau</span>
                <div className="flex items-center gap-1.5 my-1">
                  <YelpStars count={5} />
                  <span className="text-xs text-gray-400 ml-1">15/01/2026</span>
                </div>
                <p className="text-gray-700 text-sm">The best bakery in town! Their sourdough bread is absolutely divine. Fresh, crispy, and the taste is heavenly. Staff is super friendly too.</p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#FF1A1A]">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Response from the business</p>
                  <p className="text-sm text-gray-600">Thank you so much Amélie! We take great pride in our sourdough recipe. Your kind words motivate our team every day. Hope to see you again soon!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">TG</div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-gray-900">Thomas Garcia</span>
                <div className="flex items-center gap-1.5 my-1">
                  <YelpStars count={2} />
                  <span className="text-xs text-gray-400 ml-1">12/01/2026</span>
                </div>
                <p className="text-gray-700 text-sm">Overpriced for what you get. The croissants are decent but nothing special. Waited 15 minutes during a quiet period. Won&apos;t be back.</p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#FF1A1A]">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Response from the business</p>
                  <p className="text-sm text-gray-600">Hi Thomas, we&apos;re sorry your experience didn&apos;t meet expectations. We&apos;re reviewing our staffing to reduce wait times. We&apos;d love the chance to make it right — your next coffee is on us.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden ring-2 ring-blue-100">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">EM</div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-gray-900">Emma Martin</span>
                <div className="flex items-center gap-1.5 my-1">
                  <YelpStars count={4} />
                  <span className="text-xs text-gray-400 ml-1">Aujourd&apos;hui</span>
                </div>
                <p className="text-gray-700 text-sm">Great pastries and lovely atmosphere. Could use more seating but the quality makes up for it.</p>
                <div className="mt-4 bg-blue-50/50 rounded-lg p-4 border-l-4 border-blue-400">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-gray-500">Draft response</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                      <Clock className="h-2.5 w-2.5" />
                      En attente de validation
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Thanks Emma! We&apos;re glad you enjoy our pastries. Good news — we&apos;re expanding our seating area next month. See you soon!</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-[#FF1A1A] text-white rounded-md text-xs font-medium cursor-pointer hover:bg-red-700">Publish</span>
                    <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Edit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TripAdvisorBubbles({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const isFull = i <= Math.floor(count)
        const isHalf = !isFull && i === Math.floor(count) + 1 && count % 1 !== 0
        return (
          <div
            key={i}
            className="w-[14px] h-[14px] rounded-full overflow-hidden relative"
            style={{
              backgroundColor: isFull ? '#00852f' : 'transparent',
              border: '1px solid #00852f',
            }}
          >
            {isHalf && (
              <div
                className="absolute top-0 left-0 w-1/2 h-full"
                style={{ backgroundColor: '#00852f' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function TripAdvisorDemo() {
  return (
    <>
      <p className="text-center text-sm text-gray-500 mb-6">
        Voici ce que vos clients voient sur TripAdvisor :
      </p>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-black px-5 py-3 flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
              <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
            </svg>
            <span className="text-white font-semibold text-sm">Tripadvisor</span>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">NB</div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-gray-900">Nicolas Bonnet</span>
                <div className="flex items-center gap-1.5 my-1">
                  <TripAdvisorBubbles count={5} />
                </div>
                <p className="text-xs text-gray-400 mb-1">Avis écrit en janvier 2026</p>
                <p className="text-gray-900 text-sm font-bold mb-1">Un joyau caché !</p>
                <p className="text-gray-700 text-sm">Cette boulangerie artisanale est une pépite. Le pain de campagne est fait maison chaque matin. Les prix sont très raisonnables pour la qualité proposée.</p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#00852f] mb-1">Réponse de la direction</p>
                  <p className="text-sm text-gray-600">Merci Nicolas pour cette magnifique critique ! Notre pain de campagne est effectivement pétri chaque matin à 4h. Nous sommes heureux d&apos;être votre &quot;joyau caché&quot;. Au plaisir de vous revoir !</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">IV</div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-gray-900">Isabelle Vidal</span>
                <div className="flex items-center gap-1.5 my-1">
                  <TripAdvisorBubbles count={3} />
                </div>
                <p className="text-xs text-gray-400 mb-1">Avis écrit en janvier 2026</p>
                <p className="text-gray-900 text-sm font-bold mb-1">Correct sans plus</p>
                <p className="text-gray-700 text-sm">Produits corrects mais l&apos;accueil est froid. On ne se sent pas bienvenu. Dommage car les pâtisseries ont du potentiel.</p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#00852f] mb-1">Réponse de la direction</p>
                  <p className="text-sm text-gray-600">Bonjour Isabelle, merci pour votre franchise. Nous avons sensibilisé notre équipe à l&apos;importance de l&apos;accueil. Nous espérons vous surprendre agréablement lors de votre prochaine visite.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden ring-2 ring-blue-100">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">CM</div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-gray-900">Claire Marchand</span>
                <div className="flex items-center gap-1.5 my-1">
                  <TripAdvisorBubbles count={4.5} />
                </div>
                <p className="text-xs text-gray-400 mb-1">Avis écrit en février 2026</p>
                <p className="text-gray-900 text-sm font-bold mb-1">Une belle découverte !</p>
                <p className="text-gray-700 text-sm">Très bonne boulangerie, les viennoiseries sont délicieuses et fraîches. Petite déception sur les horaires du dimanche, fermée trop tôt. Mais je reviendrai sans hésiter !</p>
                <div className="mt-4 bg-blue-50/50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-[#00852f]">Brouillon de réponse</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                      <Clock className="h-2.5 w-2.5" />
                      En attente de validation
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Merci Claire ! Ravis que nos viennoiseries vous plaisent. Nos horaires du dimanche seront étendus dès le mois prochain. À très bientôt !</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-[#00852f] text-white rounded-md text-xs font-medium cursor-pointer hover:bg-green-900">Publier la réponse</span>
                    <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Modifier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const trustpilotColors: Record<number, string> = {
  1: '#FF3722',
  2: '#FF8622',
  3: '#FFCE00',
  4: '#73CF11',
  5: '#00B67A',
}

const trustpilotLabels: Record<number, string> = {
  1: 'Mauvais',
  2: 'Médiocre',
  3: 'Moyen',
  4: 'Bien',
  5: 'Excellent',
}

function TrustpilotStars({ count }: { count: number }) {
  const color = trustpilotColors[count] || '#DCDCE6'
  return (
    <div className="flex gap-[3px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-[26px] h-[26px] flex items-center justify-center"
          style={{ backgroundColor: i <= count ? color : '#DCDCE6' }}
        >
          <svg className="w-[16px] h-[16px]" viewBox="0 0 144 137" fill="none">
            <path
              d="M143.7 52.2H88.8L71.9 0 54.9 52.2H0l44.4 32.2-17 52.2 44.4-32.3 44.4 32.3-16.9-52.2z"
              fill="white"
            />
            <path
              d="M103.1 96.2l-3.8-11.8-27.4 19.9z"
              fill={i <= count ? color : '#DCDCE6'}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

function TrustpilotDemo() {
  return (
    <>
      <p className="text-center text-sm text-gray-500 mb-6">
        Voici ce que vos clients voient sur Trustpilot :
      </p>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-[#00B67A] px-5 py-3 flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
              <path d="M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z"/>
            </svg>
            <span className="text-white font-semibold text-sm">Trustpilot</span>
          </div>
          <div className="p-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrustpilotStars count={5} />
                <span className="text-xs font-medium text-gray-500">{trustpilotLabels[5]}</span>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">Service impeccable et produits au top</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-700">Julien Moreau</span>
                <span className="text-xs text-gray-400">· 3 avis · France</span>
              </div>
              <p className="text-gray-700 text-sm">Commande en ligne livrée en 24h. Les pains étaient frais et parfaitement emballés. Le service client a été très réactif quand j&apos;ai eu une question. Je recommande à 100%.</p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#00B67A]">
                <p className="text-xs font-semibold text-gray-500 mb-1">Réponse de Boulangerie Martin</p>
                <p className="text-sm text-gray-600">Merci Julien ! Nous accordons une attention particulière à l&apos;emballage pour garantir la fraîcheur. Ravi que notre service client ait pu vous aider rapidement.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrustpilotStars count={1} />
                <span className="text-xs font-medium text-gray-500">{trustpilotLabels[1]}</span>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">Déçu de ma commande</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-700">Nathalie Faure</span>
                <span className="text-xs text-gray-400">· 1 avis · France</span>
              </div>
              <p className="text-gray-700 text-sm">Livraison en retard de 2 jours et un pain était écrasé. Le remboursement a été compliqué à obtenir. Très déçue.</p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#00B67A]">
                <p className="text-xs font-semibold text-gray-500 mb-1">Réponse de Boulangerie Martin</p>
                <p className="text-sm text-gray-600">Bonjour Nathalie, nous sommes sincèrement désolés. Ce retard était dû à notre transporteur. Votre remboursement a été traité et nous vous offrons 20% sur votre prochaine commande en compensation.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden ring-2 ring-blue-100">
          <div className="p-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrustpilotStars count={4} />
                <span className="text-xs font-medium text-gray-500">{trustpilotLabels[4]}</span>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">Bon mais peut mieux faire</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-700">Marc Dupuis</span>
                <span className="text-xs text-gray-400">· 7 avis · France</span>
              </div>
              <p className="text-gray-700 text-sm">Bons produits dans l&apos;ensemble. La livraison pourrait être plus rapide mais la qualité est au rendez-vous.</p>
              <div className="mt-4 bg-blue-50/50 rounded-lg p-4 border-l-4 border-blue-400">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-500">Brouillon</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                    <Clock className="h-2.5 w-2.5" />
                    En attente de validation
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Merci Marc pour vos 4 étoiles ! Nous travaillons activement à réduire nos délais de livraison. Content que la qualité soit au rendez-vous.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-[#00B67A] text-white rounded-md text-xs font-medium cursor-pointer hover:bg-green-700">Publier</span>
                  <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Modifier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BookingDemo() {
  return (
    <>
      <p className="text-center text-sm text-gray-500 mb-6">
        Voici ce que vos clients voient sur Booking.com :
      </p>
      <div className="space-y-4">
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-[#003580] px-5 py-3 flex items-center gap-2">
            <span className="font-bold text-sm"><span className="text-white">Booking</span><span className="text-blue-200">.com</span></span>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-[#003580] flex items-center justify-center text-white font-bold text-lg">9.2</div>
                <span className="text-[10px] text-gray-500 mt-1">Superbe</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Famille Laurent</span>
                  <span className="text-xs text-gray-400">· France · Janvier 2026</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">Séjour parfait ! Chambre propre et spacieuse, petit-déjeuner copieux avec de vrais croissants frais. L&apos;emplacement est idéal, à deux pas du centre.</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">Couple</span>
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">3 nuits</span>
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">Chambre Double</span>
                </div>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#003580]">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Réponse de l&apos;établissement</p>
                  <p className="text-sm text-gray-600">Merci beaucoup pour cette note exceptionnelle ! Nos croissants viennent directement de la Boulangerie Martin à côté. Nous espérons avoir le plaisir de vous accueillir à nouveau.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-[#e74c3c] flex items-center justify-center text-white font-bold text-lg">4.8</div>
                <span className="text-[10px] text-gray-500 mt-1">Décevant</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Michel Blanc</span>
                  <span className="text-xs text-gray-400">· Belgique · Décembre 2025</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">Chambre bruyante donnant sur la rue. Climatisation en panne. Le petit-déjeuner est correct mais ne justifie pas le tarif.</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">Solo</span>
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">2 nuits</span>
                </div>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-[#003580]">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Réponse de l&apos;établissement</p>
                  <p className="text-sm text-gray-600">Cher Michel, nous vous prions de nous excuser pour ces désagréments. La climatisation a été réparée et nous avons installé du double vitrage sur les chambres côté rue. Merci pour votre retour constructif.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden ring-2 ring-blue-100">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-[#003580] flex items-center justify-center text-white font-bold text-lg">7.5</div>
                <span className="text-[10px] text-gray-500 mt-1">Bien</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">Anna Schmidt</span>
                  <span className="text-xs text-gray-400">· Allemagne · Janvier 2026</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">Good location, clean rooms. Breakfast was nice but check-in process was slow. Would stay again with improvements.</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">Couple</span>
                  <span className="text-[10px] bg-blue-50 text-[#003580] px-2 py-0.5 rounded font-medium">1 nuit</span>
                </div>
                <div className="mt-4 bg-blue-50/50 rounded-lg p-4 border-l-4 border-blue-400">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-gray-500">Brouillon</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                      <Clock className="h-2.5 w-2.5" />
                      En attente de validation
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Thank you Anna! We&apos;ve implemented a new digital check-in system to speed up the process. We hope to welcome you back for an even smoother experience.</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-[#003580] text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-900">Publier</span>
                    <span className="px-3 py-1.5 bg-white border text-gray-500 rounded-md text-xs font-medium cursor-pointer hover:bg-gray-50">Modifier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const demoComponents: Record<string, React.FC> = {
  google: GoogleDemo,
  facebook: FacebookDemo,
  yelp: YelpDemo,
  tripadvisor: TripAdvisorDemo,
  trustpilot: TrustpilotDemo,
  booking: BookingDemo,
}

export function PlatformDemo() {
  const [selected, setSelected] = useState('google')
  const DemoComponent = demoComponents[selected]

  return (
    <div>
      {/* Platform selector pills */}
      <div className="text-center py-10 px-4">
        <ScrollReveal>
        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-4">
          Compatible avec vos plateformes d&apos;avis
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {platforms.map((platform) => {
            const isSelected = selected === platform.id
            return (
              <button
                key={platform.id}
                onClick={() => setSelected(platform.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 shadow-md text-gray-900'
                    : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={isSelected ? { borderColor: platform.color, backgroundColor: `${platform.color}10` } : {}}
              >
                <span className="flex-shrink-0">{platform.icon}</span>
                {platform.name}
              </button>
            )
          })}
        </div>
        </ScrollReveal>
      </div>

      {/* Demo section */}
      <div className="pb-20 px-4 pt-8 bg-gray-100">
        <ScrollReveal>
        <div className="max-w-3xl mx-auto min-h-[750px]">
          <DemoComponent />

          <div className="text-center py-4 mt-2">
            <p className="text-base text-gray-900 font-semibold">
              Ces réponses sont générées automatiquement par notre IA.
            </p>
            <p className="text-sm text-gray-500 mt-1.5">
              Vos clients ne voient qu&apos;une réponse normale du propriétaire.
            </p>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
