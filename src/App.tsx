const App = () => {
  return (
    <main className="flex justify-center items-center h-screen w-full bg-gray-50 p-2">
      <section className="flex flex-col w-full max-w-lg rounded shadow-md shadow-gray-200 bg-white">
        <header className="w-full flex flex-row justify-between rounded rounded-b-none bg-zinc-100 border-b p-3">
          <button className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-500">
            Add
          </button>
          <button className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-500">
            Archive
          </button>
        </header>
        <ul className="flex flex-col p-2">
          <li>
            <h2 className="text-center text-gray-500 text-sm">
              You need to add a message
            </h2>
          </li>
          {/*<li>*/}
          {/*  <button className="flex flex-col w-full text-left overflow-hidden p-1 rounded">*/}
          {/*    <h2 className="w-full font-medium overflow-hidden text-ellipsis whitespace-nowrap">*/}
          {/*      Title*/}
          {/*    </h2>*/}
          {/*    <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">*/}
          {/*      Text*/}
          {/*    </p>*/}
          {/*  </button>*/}
          {/*</li>*/}
        </ul>
      </section>
    </main>
  );
};

export default App;
