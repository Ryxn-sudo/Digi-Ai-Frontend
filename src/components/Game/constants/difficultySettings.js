export const DIFFICULTY_PRESETS = {
  easy: {
    rotationRange: 15,       
    timeLimit: 40,          
    blurLevel: 0,            
    canvasScale: 1.1,       
    flipChance: 0,           
    pointsMultiplier: 1,     
    name: "Easy",
    color: "from-gray-500 to-gray-700",
    
  },
  medium: {
    rotationRange: 30,       
    timeLimit: 30,           
    blurLevel: 0,            
    canvasScale: 1,          
    flipChance: 0,           
    pointsMultiplier: 1,     
    name: "Medium",
    color: "from-blue-500 to-indigo-500",
    
  },
  hard: {
    rotationRange: 45,      
    timeLimit: 20,           
    blurLevel: 1,            
    canvasScale: 0.9,        
    flipChance: 0.2,         
    pointsMultiplier: 2,    
    name: "Hard",
    color: "from-orange-500 to-red-500",
    
  },
  expert: {
    rotationRange: 80,       
    timeLimit: 15,           
    blurLevel: 2,            
    canvasScale: 0.8,        
    flipChance: 0.4,         
    pointsMultiplier: 3,     
    name: "Expert",
    color: "from-purple-600 to-pink-600",
    
  }
};
