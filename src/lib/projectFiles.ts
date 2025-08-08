// Utility for handling project file imports
// This allows us to import project files dynamically

// Import all project files
const projectFiles = {
  // SQL Projects
  'sql/cyclistic/README.md': () => import('@/assets/projects/sql/cyclistic/README.md?raw'),
  'sql/cyclistic/cleaning.sql': () => import('@/assets/projects/sql/cyclistic/cleaning.sql?raw'),
  'sql/cyclistic/querying.sql': () => import('@/assets/projects/sql/cyclistic/querying.sql?raw'),
  'sql/cyclistic/viz_query.sql': () => import('@/assets/projects/sql/cyclistic/viz_query.sql?raw'),
  
  'sql/nashville/README.md': () => import('@/assets/projects/sql/nashville/README.md?raw'),
  'sql/nashville/nashville.sql': () => import('@/assets/projects/sql/nashville/nashville.sql?raw'),
  
  'sql/covid19/README.md': () => import('@/assets/projects/sql/covid19/README.md?raw'),
  'sql/covid19/covid19.sql': () => import('@/assets/projects/sql/covid19/covid19.sql?raw'),
  
  // Python Projects
  'python/crypto/README.md': () => import('@/assets/projects/python/crypto/README.md?raw'),
  'python/crypto/crypto.py': () => import('@/assets/projects/python/crypto/crypto.py?raw'),
  
  'python/movie/README.md': () => import('@/assets/projects/python/movie/README.md?raw'),
  'python/movie/correlation.py': () => import('@/assets/projects/python/movie/correlation.py?raw'),
  
  'python/amazon/README.md': () => import('@/assets/projects/python/amazon/README.md?raw'),
  'python/amazon/amazon.py': () => import('@/assets/projects/python/amazon/amazon.py?raw'),
  
  // Visualization Projects
  'visualization/churn/README.md': () => import('@/assets/projects/visualization/churn/README.md?raw'),
  'visualization/churn/data_analysis.sql': () => import('@/assets/projects/visualization/churn/data_analysis.sql?raw'),
  
  'visualization/sales/README.md': () => import('@/assets/projects/visualization/sales/README.md?raw'),
  
  'visualization/financial/README.md': () => import('@/assets/projects/visualization/financial/README.md?raw'),
};

export const getProjectFile = async (filePath: string): Promise<string> => {
  try {
    const fileImport = projectFiles[filePath as keyof typeof projectFiles];
    if (!fileImport) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const module = await fileImport();
    // Handle both default export and direct string content
    const content = typeof module === 'string' ? module : module.default || '';
    return content;
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error);
    return `# Error loading file: ${filePath}\n\nFile not found or could not be loaded.`;
  }
};

export const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "markdown":
      return "📄";
    case "sql":
      return "🗄️";
    case "python":
      return "🐍";
    case "powerbi":
      return "📊";
    case "tableau":
      return "📈";
    default:
      return "📁";
  }
};
