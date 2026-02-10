import { Link, useLocation } from "wouter";

export function DebugNavigation() {
  const [location, setLocation] = useLocation();

  console.log("Current location:", location);

  const testNavigation = (path: string, method: string) => {
    console.log(`Testing ${method} navigation to: ${path}`);
    
    if (method === "setLocation") {
      setLocation(path);
    } else if (method === "window") {
      window.history.pushState(null, "", path);
      // Trigger a popstate event to notify wouter
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="bg-yellow-100 p-6 border border-yellow-300 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4 text-black">Navigation Debug Test</h3>
      <p className="mb-4 text-black">Current location: <span className="font-mono bg-white p-1">{location}</span></p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-black">Link with 'to' prop:</h4>
          <Link to="/about-us" className="bg-blue-600 text-white px-4 py-2 rounded block text-center hover:bg-blue-700">
            About Us (to)
          </Link>
          <Link to="/careers" className="bg-blue-600 text-white px-4 py-2 rounded block text-center hover:bg-blue-700">
            Careers (to)
          </Link>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-black">Link with 'href' prop:</h4>
          <Link href="/about-us" className="bg-green-600 text-white px-4 py-2 rounded block text-center hover:bg-green-700">
            About Us (href)
          </Link>
          <Link href="/careers" className="bg-green-600 text-white px-4 py-2 rounded block text-center hover:bg-green-700">
            Careers (href)
          </Link>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-black">setLocation method:</h4>
          <button 
            onClick={() => testNavigation('/about-us', 'setLocation')}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
          >
            About Us (setLocation)
          </button>
          <button 
            onClick={() => testNavigation('/careers', 'setLocation')}
            className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
          >
            Careers (setLocation)
          </button>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <button 
          onClick={() => setLocation('/')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}