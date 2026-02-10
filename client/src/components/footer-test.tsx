import { Link, useLocation } from "wouter";

export function FooterTest() {
  const [location, setLocation] = useLocation();

  const testNavigation = (path: string) => {
    console.log(`Testing navigation to: ${path} from current location: ${location}`);
    setLocation(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 p-8 border rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Footer Navigation Test</h3>
      <p className="mb-4">Current location: <span className="font-mono">{location}</span></p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => testNavigation('/about-us')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test About Us
        </button>
        
        <button 
          onClick={() => testNavigation('/careers')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test Careers
        </button>
        
        <button 
          onClick={() => testNavigation('/contact')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test Contact
        </button>
        
        <button 
          onClick={() => testNavigation('/help-center')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test Help Center
        </button>
      </div>
      
      <div className="mt-4">
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}