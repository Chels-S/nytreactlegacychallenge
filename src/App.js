import './App.css';
import NytFetch from './components/NytApp';

function App() {
  return (
    <div className="App">
      <h1>NYT React Legacy and TypeScript</h1>
      <h3>Replicate the NYT application from gold badge. It should do the following:</h3>
      <p>Contain one class component (stateful) and one functional component (stateless)</p>
      <p>Take in a search string</p>
      <p>Take in an optional start date and end date</p>
      <p>There should be only one function that handles all the inputs</p>
      <p>Fetch to the NYT API article search endpoint.</p>
      <p>Store the results in the state of the class component</p>
      <p>Map over the retrieved articles to display them in the functional component</p>
      <p>The map should display the following from each article:</p>
        <ul>
          <li>The title of the article as the header that shoudl take you to the article when you click it</li>
          <li>A list of keywords associated to the article</li>
          <li>A singular image for the article</li>
        </ul>
        <p>Include a navigation to cycle through different pages of results</p>
        <NytFetch />
    </div>
  );
}

export default App;
