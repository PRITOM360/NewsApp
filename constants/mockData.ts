import { Article } from '@/types/article';

export const mockArticles: Article[] = [
  {
    source: {
      id: 'cnn',
      name: 'CNN'
    },
    author: 'John Smith',
    title: 'Breaking: Major Tech Company Announces Revolutionary AI Assistant',
    description: 'A leading tech company has unveiled a new AI assistant that promises to transform how we interact with technology in our daily lives.',
    url: 'https://example.com/tech-announcement',
    urlToImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-15T08:45:00Z',
    content: 'A leading technology company announced today their newest AI assistant, which they claim will revolutionize how people interact with their devices. The assistant, powered by a new type of large language model, can understand context better than previous versions and handle complex requests. The company CEO stated, "This represents a significant leap forward in artificial intelligence capabilities."',
    category: 'technology'
  },
  {
    source: {
      id: 'bbc-news',
      name: 'BBC News'
    },
    author: 'Sarah Johnson',
    title: 'Global Climate Summit Reaches Historic Agreement',
    description: 'World leaders have reached a landmark agreement at the Global Climate Summit, committing to ambitious emission reduction targets.',
    url: 'https://example.com/climate-agreement',
    urlToImage: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-14T15:30:00Z',
    content: 'After two weeks of intense negotiations, world leaders at the Global Climate Summit have reached a historic agreement to reduce carbon emissions significantly by 2030. The agreement, which was signed by 195 countries, includes financial support for developing nations to transition to clean energy and sets binding targets for industrialized nations. Environmental activists have cautiously welcomed the agreement while stressing the need for immediate action.',
    category: 'politics'
  },
  {
    source: {
      id: 'espn',
      name: 'ESPN'
    },
    author: 'Mike Rodriguez',
    title: 'Underdog Team Wins Championship in Stunning Upset',
    description: 'In one of the biggest sports upsets of the year, the underdog team defeated the defending champions in a thrilling final match.',
    url: 'https://example.com/sports-upset',
    urlToImage: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-14T22:15:00Z',
    content: 'In a stunning upset that will go down in sports history, the underdog team defeated the heavily favored defending champions in the final match of the tournament. Playing with extraordinary determination and teamwork, they overcame a first-half deficit to claim their first championship trophy. The team captain credited their success to months of intense preparation and a belief that they could compete with anyone despite being written off by most analysts at the beginning of the season.',
    category: 'sports'
  },
  {
    source: {
      id: 'financial-times',
      name: 'Financial Times'
    },
    author: 'Robert Chen',
    title: 'Markets Soar as Central Bank Announces New Economic Measures',
    description: 'Global markets responded positively as the Central Bank announced a comprehensive package of economic stimulus measures.',
    url: 'https://example.com/economic-measures',
    urlToImage: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-13T09:20:00Z',
    content: 'Global markets experienced significant gains today following the Central Bank\'s announcement of a comprehensive economic stimulus package. The measures include interest rate adjustments, expanded bond buying programs, and new lending facilities designed to support businesses affected by recent economic challenges. Economists have generally reacted positively to the announcement, though some have expressed concerns about potential long-term inflationary effects of the policies.',
    category: 'business'
  },
  {
    source: {
      id: 'nat-geo',
      name: 'National Geographic'
    },
    author: 'Emma Hughes',
    title: 'Scientists Discover New Marine Species in Deep Ocean Expedition',
    description: 'A team of marine biologists has discovered several previously unknown species during an expedition to explore deep ocean trenches.',
    url: 'https://example.com/marine-discovery',
    urlToImage: 'https://images.pexels.com/photos/3122673/pexels-photo-3122673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-12T11:30:00Z',
    content: 'A team of marine biologists announced today the discovery of several previously unknown species during their recent deep ocean expedition. Using advanced submersible technology, the scientists were able to explore ocean trenches at depths exceeding 8,000 meters. Among their discoveries are a new species of anglerfish with unique bioluminescent properties and several invertebrates that appear to have evolved specialized adaptations for surviving the extreme pressure conditions in the deep ocean environment.',
    category: 'science'
  },
  {
    source: {
      id: 'variety',
      name: 'Variety'
    },
    author: 'Lisa Wong',
    title: 'Indie Film Takes Top Prize at International Festival',
    description: 'A low-budget independent film has won the prestigious Golden Palm award at this year\'s International Film Festival.',
    url: 'https://example.com/film-festival',
    urlToImage: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-11T16:45:00Z',
    content: 'In a surprise turn of events, a low-budget independent film has won the prestigious Golden Palm award at this year\'s International Film Festival. The film, which was made with a budget of less than $500,000 and features mostly unknown actors, received unanimous praise from the jury for its innovative storytelling approach and authentic performances. The director, who mortgaged their home to finance the project, delivered an emotional acceptance speech highlighting the importance of pursuing artistic vision despite financial constraints.',
    category: 'entertainment'
  },
  {
    source: {
      id: 'wired',
      name: 'Wired'
    },
    author: 'David Park',
    title: 'New Quantum Computing Breakthrough Could Transform Cybersecurity',
    description: 'Researchers have achieved a significant breakthrough in quantum computing that could have major implications for data encryption and cybersecurity.',
    url: 'https://example.com/quantum-breakthrough',
    urlToImage: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-10T14:15:00Z',
    content: 'Researchers at a leading university have announced a significant breakthrough in quantum computing that could transform the field of cybersecurity. The team has developed a new type of quantum bit (qubit) that remains stable for much longer than previous designs, enabling more complex quantum calculations. Experts suggest this development could accelerate progress toward quantum computers capable of breaking current encryption methods, prompting calls for faster implementation of quantum-resistant cryptography standards across critical infrastructure and communications systems.',
    category: 'technology'
  },
  {
    source: {
      id: 'health-news',
      name: 'Health News Today'
    },
    author: 'Dr. James Wilson',
    title: 'Study Reveals Promising Results for New Alzheimer\'s Treatment',
    description: 'A large-scale clinical trial has shown promising results for a new treatment approach targeting the underlying causes of Alzheimer\'s disease.',
    url: 'https://example.com/alzheimers-treatment',
    urlToImage: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-09T10:00:00Z',
    content: 'A major breakthrough in Alzheimer\'s research was announced today as results from a large-scale clinical trial showed promising outcomes for a new treatment approach. Unlike previous medications that only addressed symptoms, this treatment targets the underlying pathological process of the disease. Participants who received the treatment demonstrated significantly slower cognitive decline compared to the control group. While researchers caution that this is not a cure, they describe the results as the most significant advancement in Alzheimer\'s treatment in decades.',
    category: 'health'
  },
  {
    source: {
      id: 'reuters',
      name: 'Reuters'
    },
    author: 'Thomas Brown',
    title: 'Peace Negotiations Begin After Months of Regional Conflict',
    description: 'Representatives from opposing factions have agreed to begin formal peace negotiations following months of destructive regional conflict.',
    url: 'https://example.com/peace-negotiations',
    urlToImage: 'https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-08T18:30:00Z',
    content: 'After months of devastating conflict that has displaced thousands and created a humanitarian crisis, representatives from opposing factions have agreed to begin formal peace negotiations. The talks, which will be mediated by the United Nations, are scheduled to start next week in a neutral location. International observers express cautious optimism about the development but note that significant challenges remain in addressing the root causes of the conflict and establishing a sustainable framework for peaceful coexistence in the region.',
    category: 'politics'
  },
  {
    source: {
      id: 'tech-review',
      name: 'Tech Review'
    },
    author: 'Jennifer Lee',
    title: 'Revolutionary Smart Home System Integrates AI with Renewable Energy',
    description: 'A startup has unveiled an innovative smart home system that combines artificial intelligence with renewable energy management to optimize household efficiency.',
    url: 'https://example.com/smart-home-system',
    urlToImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-05-07T13:45:00Z',
    content: 'A technology startup has launched what it describes as the world\'s first truly integrated smart home system that combines advanced artificial intelligence with comprehensive renewable energy management. The system learns household patterns to optimize energy usage while maximizing utilization of solar panels and battery storage. Early tests show that homes equipped with the system reduce their carbon footprint by up to 60% while saving homeowners an average of 40% on utility bills. Industry analysts suggest this could represent a significant step forward in mainstream adoption of both smart home technology and renewable energy solutions.',
    category: 'technology'
  }
];