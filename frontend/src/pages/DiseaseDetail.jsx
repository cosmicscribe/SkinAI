
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Circle, Info } from 'lucide-react'
import Navbar from '../components/Navbar'

// Disease data with detailed information
const diseaseDetails = {
  'Actinic Keratosis': {
    title: 'Actinic Keratosis',
    subtitle: 'Causes, Symptoms, and When to Take Action',
    description: 'Actinic keratosis (AK) is a precancerous skin lesion caused by long-term exposure to ultraviolet (UV) radiation. Although AK itself is not cancer, it has the potential to develop into squamous cell carcinoma (SCC) if left untreated. Early recognition and management are important to reduce the risk of progression.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Texture: Rough, dry, or scaly patches',
        'Color: Pink, red, flesh-toned, or brownish',
        'Shape: Flat or slightly raised with irregular borders',
        'Location: Commonly appears on sun-exposed areas — face, ears, scalp, neck, forearms, and backs of the hands',
        'Lesions may be easier to feel than see at first and can range in number from a single spot to many across affected skin.'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Actinic keratosis is mainly caused by chronic UV exposure — whether from sunlight or artificial sources (e.g., tanning beds). Other contributing factors include fair skin, age (more common in people over 40), weakened immune system, and a history of sunburns.'
    },
    summary: {
      points: [
        'Actinic keratosis is a precancerous lesion linked to chronic UV exposure',
        'Common in older, fair-skinned individuals with high sun exposure',
        'May progress to squamous cell carcinoma if left untreated',
        'Sun protection and early intervention are essential'
      ]
    },
    reference: {
      citation: 'Ernst M, Dirschka T, Stockfleth E, et al. Actinic keratosis: A clinical guide. J Eur Acad Dermatol Venereol. 2024;38(5):e263–e278.',
      doi: 'https://doi.org/10.1111/jdv.19897'
    }
  },
  'Acne Vulgaris': {
    title: 'Acne Vulgaris',
    subtitle: 'Causes, Symptoms, and Treatment',
    description: 'Acne vulgaris is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells. It most commonly affects teenagers but can occur at any age.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Whiteheads: Closed plugged pores',
        'Blackheads: Open plugged pores',
        'Papules: Small red, tender bumps',
        'Pustules: Pimples with pus at their tips',
        'Nodules: Large, solid, painful lumps beneath the surface',
        'Cystic lesions: Painful, pus-filled lumps beneath the surface'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Acne is caused by excess oil production, hair follicles clogged by oil and dead skin cells, bacteria, and inflammation. Hormonal changes, certain medications, diet, and stress can also contribute.'
    },
    summary: {
      points: [
        'Acne vulgaris is a common inflammatory skin condition affecting hair follicles',
        'Most prevalent during adolescence but can occur at any age',
        'Caused by excess sebum production, clogged pores, and bacterial overgrowth',
        'Treatment options range from topical medications to oral antibiotics and hormonal therapy'
      ]
    },
    reference: {
      citation: 'Zaenglein AL, Pathy AL, Schlosser BJ, et al. Guidelines of care for the management of acne vulgaris. J Am Acad Dermatol. 2016;74(5):945-973.',
      doi: 'https://doi.org/10.1016/j.jaad.2015.12.037'
    }
  },
  'Atopic Dermatitis': {
    title: 'Atopic Dermatitis',
    subtitle: 'Understanding Eczema',
    description: 'Atopic dermatitis, also known as eczema, is a chronic condition that makes your skin red and itchy. It\'s common in children but can occur at any age.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Dry, scaly patches of skin',
        'Red to brownish-gray patches',
        'Intense itching, especially at night',
        'Small, raised bumps that may leak fluid when scratched',
        'Thickened, cracked, or scaly skin',
        'Raw, sensitive, swollen skin from scratching'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Atopic dermatitis is caused by a combination of genetic and environmental factors. It\'s often associated with a family history of allergies, asthma, or eczema. Triggers include dry skin, irritants, stress, and allergens.'
    },
    summary: {
      points: [
        'Atopic dermatitis is a chronic inflammatory skin condition',
        'Often begins in childhood and may persist into adulthood',
        'Characterized by dry, itchy skin and recurrent flare-ups',
        'Management focuses on moisturizing, avoiding triggers, and controlling inflammation'
      ]
    },
    reference: {
      citation: 'Eichenfield LF, Tom WL, Chamlin SL, et al. Guidelines of care for the management of atopic dermatitis. J Am Acad Dermatol. 2014;70(2):338-351.',
      doi: 'https://doi.org/10.1016/j.jaad.2013.10.010'
    }
  },
  'Basal Cell Carcinoma': {
    title: 'Basal Cell Carcinoma',
    subtitle: 'The Most Common Skin Cancer',
    description: 'Basal cell carcinoma (BCC) is the most common form of skin cancer. It develops in the basal cells, which are found in the lower part of the epidermis. BCC rarely spreads to other parts of the body but can cause significant local damage if not treated.',
    appearance: {
      title: 'How It Looks',
      points: [
        'A pearly or waxy bump',
        'A flat, flesh-colored or brown scar-like lesion',
        'A bleeding or scabbing sore that heals and returns',
        'A pink growth with a slightly elevated, rolled edge',
        'Commonly appears on sun-exposed areas like face, neck, and arms'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'BCC is primarily caused by long-term exposure to ultraviolet (UV) radiation from sunlight or tanning beds. Risk factors include fair skin, age, history of sunburns, and exposure to radiation.'
    },
    summary: {
      points: [
        'Basal cell carcinoma is the most common form of skin cancer',
        'Rarely metastasizes but can cause significant local tissue damage',
        'Strongly associated with cumulative UV exposure over lifetime',
        'Early detection and treatment result in excellent prognosis'
      ]
    },
    reference: {
      citation: 'Kim DP, Kus KJB, Ruiz E. Basal cell carcinoma review. Hematol Oncol Clin North Am. 2019;33(1):13-24.',
      doi: 'https://doi.org/10.1016/j.hoc.2018.09.004'
    }
  },
  'Melanoma': {
    title: 'Melanoma',
    subtitle: 'The Most Dangerous Skin Cancer',
    description: 'Melanoma is the most serious type of skin cancer. It develops in the cells that produce melanin, the pigment that gives skin its color. Early detection is crucial for successful treatment.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Asymmetrical shape: Two halves that don\'t match',
        'Irregular border: Ragged, notched, or blurred edges',
        'Varied color: Shades of brown, black, tan, red, white, or blue',
        'Diameter: Larger than 6mm (about the size of a pencil eraser)',
        'Evolving: Changes in size, shape, or color over time'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Melanoma is caused by UV radiation damage to skin cells. Risk factors include excessive sun exposure, tanning bed use, fair skin, many moles, family history, and weakened immune system.'
    },
    summary: {
      points: [
        'Melanoma is the most serious and potentially fatal form of skin cancer',
        'Early detection is critical for successful treatment outcomes',
        'Follows the ABCDE rule: Asymmetry, Border, Color, Diameter, Evolving',
        'Regular skin self-examinations and professional screenings are essential'
      ]
    },
    reference: {
      citation: 'Swetter SM, Tsao H, Bichakjian CK, et al. Guidelines of care for the management of primary cutaneous melanoma. J Am Acad Dermatol. 2019;80(1):208-250.',
      doi: 'https://doi.org/10.1016/j.jaad.2018.08.055'
    }
  },
  'Melanocytic Nevus': {
    title: 'Melanocytic Nevus',
    subtitle: 'Common Moles',
    description: 'A melanocytic nevus, commonly known as a mole, is a benign growth on the skin that develops when melanocytes (pigment-producing cells) grow in clusters. Most moles are harmless, but some can develop into melanoma.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Round or oval shape with smooth edges',
        'Uniform color (usually brown, but can be tan, black, red, pink, or skin-colored)',
        'Size typically less than 6mm in diameter',
        'Can be flat or raised',
        'May have hair growing from it',
        'Usually appears in childhood or early adulthood'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Moles are caused by clusters of melanocytes. They can be present at birth (congenital) or develop over time due to sun exposure, genetics, and hormonal changes during puberty or pregnancy.'
    }
  },
  'Psoriasis': {
    title: 'Psoriasis',
    subtitle: 'Chronic Autoimmune Condition',
    description: 'Psoriasis is a chronic autoimmune condition that causes the rapid buildup of skin cells. This buildup causes scaling on the skin\'s surface, leading to inflammation and redness.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Red patches of skin covered with thick, silvery scales',
        'Small scaling spots (commonly seen in children)',
        'Dry, cracked skin that may bleed',
        'Itching, burning, or soreness',
        'Thickened, pitted, or ridged nails',
        'Swollen and stiff joints'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Psoriasis is an autoimmune disorder where the immune system attacks healthy skin cells. Triggers include infections, stress, cold weather, smoking, heavy alcohol consumption, and certain medications.'
    }
  },
  'Seborrheic Keratosis': {
    title: 'Seborrheic Keratosis',
    subtitle: 'Benign Skin Growths',
    description: 'Seborrheic keratosis is a common, benign skin growth that appears as waxy, scaly, slightly elevated lesions. They are noncancerous and don\'t require treatment unless they become irritated or cosmetically bothersome.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Waxy, stuck-on appearance',
        'Brown, black, or tan color',
        'Round or oval shape',
        'Slightly raised from the skin surface',
        'Rough, scaly texture',
        'Size ranges from very small to over an inch',
        'Commonly appears on face, chest, shoulders, or back'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'The exact cause is unknown, but seborrheic keratosis tends to run in families. They become more common with age and are not related to sun exposure. They are harmless and don\'t become cancerous.'
    }
  },
  'Dermatofibroma': {
    title: 'Dermatofibroma',
    subtitle: 'Benign Skin Tumor',
    description: 'Dermatofibroma is a common, benign skin growth that typically appears as a small, firm bump. It\'s harmless and usually doesn\'t require treatment.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Small, firm bump under the skin',
        'Brown, pink, or reddish-brown color',
        'Dimples inward when pinched',
        'Usually less than 1cm in diameter',
        'Commonly appears on legs, especially lower legs',
        'May be slightly tender or itchy'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'The exact cause is unknown, but dermatofibromas may develop after minor skin injuries like insect bites or scratches. They are more common in women and typically appear in adulthood.'
    }
  },
  'Vascular Lesion': {
    title: 'Vascular Lesion',
    subtitle: 'Abnormal Blood Vessel Growth',
    description: 'Vascular lesions are abnormalities of blood vessels in the skin. They can be present at birth or develop later in life and range from harmless birthmarks to more serious conditions.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Red, pink, or purple discoloration',
        'Flat or raised lesions',
        'May blanch (turn white) when pressed',
        'Can vary in size from small dots to large patches',
        'Common types include hemangiomas, port-wine stains, and spider veins'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Vascular lesions can be congenital (present at birth) or acquired. Causes include genetic factors, sun exposure, aging, trauma, or underlying medical conditions. Some are harmless, while others may require treatment.'
    }
  },
  'Squamous Cell Carcinoma': {
    title: 'Squamous Cell Carcinoma',
    subtitle: 'Second Most Common Skin Cancer',
    description: 'Squamous cell carcinoma (SCC) is the second most common form of skin cancer. It develops in the squamous cells that make up the middle and outer layers of the skin. While it can be aggressive, it\'s usually treatable when caught early.',
    appearance: {
      title: 'How It Looks',
      points: [
        'A firm, red nodule',
        'A flat lesion with a scaly, crusted surface',
        'A new sore or raised area on an old scar or ulcer',
        'A rough, scaly patch on the lip that may evolve into an open sore',
        'A red, raised patch or wart-like sore on or in the anus or genitals'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'SCC is primarily caused by cumulative UV exposure over a lifetime. Risk factors include fair skin, age, history of sunburns, exposure to radiation, weakened immune system, and certain genetic conditions.'
    }
  },
  'Benign Keratosis': {
    title: 'Benign Keratosis',
    subtitle: 'Non-Cancerous Skin Growth',
    description: 'Benign keratosis refers to non-cancerous skin growths that are common in older adults. These growths are harmless and typically don\'t require treatment unless they become irritated or cosmetically bothersome.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Waxy, scaly, slightly elevated lesions',
        'Brown, black, or tan in color',
        'Round or oval shape',
        'Stuck-on appearance',
        'Rough texture',
        'Commonly appears on face, chest, shoulders, or back'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'The exact cause is unknown, but benign keratosis tends to run in families and becomes more common with age. They are not related to sun exposure and are completely harmless.'
    }
  },
  'Contact Dermatitis': {
    title: 'Contact Dermatitis',
    subtitle: 'Skin Reaction to Irritants',
    description: 'Contact dermatitis is a red, itchy rash caused by direct contact with a substance or an allergic reaction to it. The rash isn\'t contagious or life-threatening, but it can be very uncomfortable.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Red rash or bumps',
        'Itching, which may be severe',
        'Dry, cracked, scaly skin',
        'Blisters, sometimes with oozing and crusting',
        'Swelling, burning, or tenderness',
        'Appears only where the skin came into contact with the irritant'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Contact dermatitis can be caused by irritants (soaps, detergents, chemicals) or allergens (nickel, poison ivy, fragrances, preservatives). The reaction can occur immediately or develop over time with repeated exposure.'
    }
  },
  'Rosacea': {
    title: 'Rosacea',
    subtitle: 'Chronic Facial Skin Condition',
    description: 'Rosacea is a common skin condition that causes redness and visible blood vessels in your face. It may also produce small, red, pus-filled bumps. These signs and symptoms may flare up for weeks to months and then go away for a while.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Facial redness, particularly on the nose and cheeks',
        'Small, red, pus-filled bumps',
        'Visible blood vessels',
        'Burning or stinging sensation',
        'Dry, rough, or scaly skin',
        'Thickened skin, especially on the nose'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'The exact cause is unknown, but factors that may trigger or worsen rosacea include hot drinks, spicy foods, alcohol, temperature extremes, sunlight, stress, certain medications, and a family history of rosacea.'
    }
  },
  'Vitiligo': {
    title: 'Vitiligo',
    subtitle: 'Loss of Skin Pigmentation',
    description: 'Vitiligo is a condition in which the skin loses its pigment cells (melanocytes). This results in discolored patches in different areas of the body, including the skin, hair, and mucous membranes.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Patchy loss of skin color',
        'Premature whitening or graying of hair',
        'Loss of color in the tissues inside the mouth and nose',
        'Loss of or change in color of the inner layer of the eye',
        'Patches can appear anywhere on the body',
        'Often symmetrical on both sides of the body'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Vitiligo occurs when melanocytes die or stop producing melanin. The exact cause is unknown, but it may be related to an autoimmune disorder, genetic factors, or a trigger event such as stress, sunburn, or exposure to industrial chemicals.'
    }
  },
  'Shingles': {
    title: 'Shingles',
    subtitle: 'Viral Skin Infection',
    description: 'Shingles is a viral infection that causes a painful rash. Although shingles can occur anywhere on your body, it most often appears as a single stripe of blisters that wraps around either the left or the right side of your torso.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Pain, burning, numbness, or tingling',
        'Sensitivity to touch',
        'A red rash that begins a few days after the pain',
        'Fluid-filled blisters that break open and crust over',
        'Itching',
        'Fever, headache, and fatigue'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Shingles is caused by the varicella-zoster virus, the same virus that causes chickenpox. After you\'ve had chickenpox, the virus lies inactive in nerve tissue near your spinal cord and brain. Years later, the virus may reactivate as shingles.'
    }
  },
  'Scabies': {
    title: 'Scabies',
    subtitle: 'Mite Infestation',
    description: 'Scabies is an infestation of the skin by the human itch mite. The microscopic scabies mite burrows into the upper layer of the skin where it lives and lays its eggs. The most common symptoms are severe itching and a pimple-like skin rash.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Intense itching, especially at night',
        'Thin, irregular burrow tracks made up of tiny blisters or bumps',
        'Commonly found in the folds of the skin',
        'Rash may appear as small red bumps',
        'Scratching can lead to sores and secondary infections',
        'Common locations: between fingers, wrists, elbows, armpits, waist, genitals'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Scabies is caused by the Sarcoptes scabiei mite. It\'s highly contagious and spreads through prolonged skin-to-skin contact with an infected person. It can also spread through sharing clothing, towels, or bedding with someone who has scabies.'
    }
  },
  'Ringworm': {
    title: 'Ringworm',
    subtitle: 'Fungal Skin Infection',
    description: 'Ringworm is a common fungal infection of the skin. Despite its name, it\'s not caused by a worm. The infection causes a characteristic ring-shaped rash that can appear anywhere on the body.',
    appearance: {
      title: 'How It Looks',
      points: [
        'A scaly, ring-shaped area, typically on the buttocks, trunk, arms, and legs',
        'Itchiness',
        'A clear or scaly area inside the ring, perhaps with a scattering of bumps',
        'Slightly raised, expanding rings',
        'A round, flat patch of itchy skin',
        'Overlapping rings'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Ringworm is caused by various types of fungi. It spreads through direct contact with an infected person or animal, or indirectly by touching objects or surfaces that have the fungus on them. Warm, moist environments favor its growth.'
    }
  },
  'Hives': {
    title: 'Hives',
    subtitle: 'Urticaria',
    description: 'Hives, also known as urticaria, are raised, itchy welts that appear on the skin. They can be red, pink, or flesh-colored, and they can vary in size from small spots to large patches several inches in diameter.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Raised, red or skin-colored welts (wheals)',
        'Welts that vary in size and shape',
        'Itching, which may be severe',
        'Welts that appear and fade repeatedly',
        'Welts that may join together to form larger areas',
        'Swelling of the lips, eyelids, and inside the throat'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Hives are often caused by an allergic reaction to food, medication, or other substances. Other triggers include stress, infections, temperature changes, exercise, and pressure on the skin. In many cases, the cause is never identified.'
    }
  },
  'Wart': {
    title: 'Wart',
    subtitle: 'Viral Skin Growth',
    description: 'Warts are small, grainy skin growths that occur most often on your fingers or hands. They\'re caused by the human papillomavirus (HPV) and are contagious. Most warts are harmless and disappear on their own.',
    appearance: {
      title: 'How It Looks',
      points: [
        'Small, fleshy, grainy bumps',
        'Flesh-colored, white, pink, or tan',
        'Rough to the touch',
        'Sprinkled with black pinpoints (clotted blood vessels)',
        'Common on fingers, hands, and feet',
        'May appear singly or in clusters'
      ]
    },
    causes: {
      title: 'Why Does It Appear?',
      description: 'Warts are caused by the human papillomavirus (HPV). The virus enters the body through breaks in the skin. Warts are contagious and can spread through direct contact or by touching something that touched a wart.'
    }
  }
}

// Default content for diseases not in the detailed list
const getDefaultContent = (diseaseName) => ({
  title: diseaseName,
  subtitle: 'Information and Overview',
  description: `${diseaseName} is a skin condition that may require medical attention.It\'s important to consult with a healthcare professional for accurate diagnosis and appropriate treatment.`,
  appearance: {
    title: 'How It Looks',
    points: [
      'Appearance can vary depending on the specific condition',
      'May present as patches, bumps, or discoloration',
      'Location and characteristics depend on the type of condition',
      'Consult a dermatologist for proper evaluation'
    ]
  },
  causes: {
    title: 'Why Does It Appear?',
    description: 'The causes can vary depending on the specific condition. Factors may include genetics, environmental exposure, immune system function, or underlying health conditions. A healthcare provider can provide specific information about your condition.'
  },
  summary: {
    points: [
      `${diseaseName} is a skin condition that requires medical evaluation`,
      'Early detection and treatment are important for best outcomes',
      'Consult with a healthcare provider for accurate diagnosis',
      'Follow medical advice for proper management and care'
    ]
  },
  reference: {
    citation: 'Consult current medical literature and dermatology resources for the most up-to-date information.',
    doi: ''
  }
})

const DiseaseDetail = ({ isAuthenticated, user, onLogout }) => {
  const { diseaseName } = useParams()
  const navigate = useNavigate()

  // Decode the disease name from URL
  const decodedName = decodeURIComponent(diseaseName || '')
  const disease = diseaseDetails[decodedName] || getDefaultContent(decodedName)

  const handleCheckSkin = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back Link */}
        < Link
          to="/diseases"
          className="inline-flex items-center text-[#2C3E50] hover:text-[#4A90E2] transition-colors mb-6 font-medium"
        >
          ← Back to dictionary
        </Link >

        {/* Title */}
        < h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4" >
          {disease.title}
        </h1 >

        {/* Subtitle */}
        < h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-6" >
          {disease.subtitle}
        </h2 >

        {/* Description */}
        < p className="text-lg text-gray-700 mb-8 leading-relaxed" >
          {disease.description}
        </p >

        {/* How It Looks Section */}
        < div className="mb-8" >
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">
            {disease.appearance.title}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            {disease.appearance.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div >

        {/* Why Does It Appear Section */}
        < div className="mb-8" >
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">
            {disease.causes.title}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {disease.causes.description}
          </p>
        </div >

        {/* Summary Section */}
        {
          disease.summary && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Summary</h3>
              <ul className="list-disc list-inside space-y-2 text-[#2C3E50] text-lg">
                {disease.summary.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )
        }

        {/* Reference Section */}
        {
          disease.reference && (
            <div className="mb-8">
              <p className="text-[#2C3E50] font-medium mb-2">Based on materials from:</p>
              <p className="text-gray-700 text-lg mb-2">{disease.reference.citation}</p>
              {disease.reference.doi && (
                <a
                  href={disease.reference.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A90E2] hover:underline text-lg"
                >
                  {disease.reference.doi}
                </a>
              )}
            </div>
          )
        }

        {/* Disclaimer */}
        <div className="mb-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#2C3E50] mb-2">Disclaimer</h4>
              <p className="text-[#2C3E50] text-lg">
                This content is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleCheckSkin}
            className="bg-[#FF3333] hover:bg-[#e62e2e] text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg uppercase"
          >
            CHECK YOUR SKIN NOW
          </button>
        </div>
      </div >
    </div >
  )
}

export default DiseaseDetail

