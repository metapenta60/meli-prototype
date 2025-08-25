export interface Item {
    ratingInfo: RatingInfo;
    ratingDistribution: RatingBucket[] | null;
    description: string;
    questions: QA[];
    seller: Seller;
    generalInfo: GeneralInfo;
    images: ItemImage[];
    characteristicsInfo: CharacteristicsInfo;
    paymentInfo: PaymentInfo;
  }
  
  
  export interface RatingInfo {
    overallRating: number;
    totalRatings: number;
    distribution: RatingBucket[];
    reviews: Review[];
  }
  
  export interface RatingBucket {
    rating: number;
    count: number;
    percentage: number;
  }
  
  export interface Review {
    rating: number;
    comment: string;
    date: string;
  }
  
  
  export interface QA {
    question: string;
    answer: string;
    date: string;
  }
  
  
  export interface Seller {
    sellerName: string;
    sellerImageUrl: string;
    followersCount: number;
    productsCount: number;
    rating: number;
    salesCount: number;
    attentionDescription: string;
    puntualityDescription: string;
  }
  
  
  export interface GeneralInfo {
    title: string;
    rating: number;
    reviewCount: number;
    price: number;
    status: string;
    soldCount: number;
  }
  
  
  export interface ItemImage {
    alt: string;
    urlSmallVersion: string;
    urlMediumVersion: string;
  }
  
  
  export interface CharacteristicsInfo {
    mainCharacteristics: MainCharacteristic[];
    otherCharacteristics: CharacteristicsGroup[];
  }
  
  export interface MainCharacteristic {
    icon: string;
    title: string;
    content: string;
  }
  
  export interface CharacteristicsGroup {
    title: string;
    characteristics: CharacteristicItem[];
  }
  
  export interface CharacteristicItem {
    title: string;
    value: string;
  }
  
  
  export interface PaymentInfo {
    installments: number;
    paymentMethods: PaymentMethod[];
  }
  
  export interface PaymentMethod {
    title: string;
    images: string[];
  }
  