import { component$, $, useStore} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from '@builder.io/qwik-city';




export const useGitUser = routeLoader$(async () => {
  // This code runs only on the server, after every navigation
  const res = await fetch("https://api.github.com/users/pompy");
  const user = await res.json();
  return user ;
});



export const randomGenerate = () => Math.floor(Math.random() * 6) + 1;

export default component$(() => {

  const user = useGitUser();


  const dice = useStore({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
  });

 

  const roll = $(() => {
    dice.value1 = randomGenerate()
    dice.value2 = randomGenerate()
    dice.value3 = randomGenerate()
    dice.value4 = randomGenerate()
  });
  

 

  return (
    <div style={{ backgroundColor: 'lightgray', padding: '20px', margin:'35px' }}>
      <center>
    <h2 class="red">Generate 4 digit No</h2>
    <h1 style={{ color: 'blue' }}>{dice.value1}{dice.value2}{dice.value3}{dice.value4}</h1>
    <div>
      <button onClick$={roll}>Roll</button>
    </div>
    
    {<pre>{JSON.stringify(user.value, null, 4)}</pre>}

    </center>
  </div>
  );
});

export const head: DocumentHead = {
  title: "First Qwik App",
  meta: [
    {
      name: "firstapp",
      content: "NA",
    },
  ],
};
