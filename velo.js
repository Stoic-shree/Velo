const veloform = document.getElementById("veloform");
const agentInput = document.getElementById("agentInput");
const result = document.getElementById("result");

veloform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = agentInput.value.trim();
  console.log(input);
  if (!input) return;

  result.innerText = "Loading..";
  try {
    //if api fails
    const response = await fetch("https://valorant-api.com/v1/agents");
    if (!response.ok) throw new Error("Fetch failed");

    const data = await response.json();
    let foundAgent = null;
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].displayName.toLowerCase() === input.toLowerCase()) {
        foundAgent = data.data[i];
        break;
      }
    }
    if (!foundAgent) {
      result.innerText = "Agent Not Found";
      return;
    }

    result.innerHTML = `
      <h2>${foundAgent.displayName}</h2>
      <img src="${foundAgent.displayIcon}" width="150" />
     <p>
  <strong>Role:</strong>
  ${foundAgent.role ? foundAgent.role.displayName : "N/A"}
</p>
      <p>${foundAgent.description}</p>
    `;
  } catch (e) {
    result.innerText = "GG You are not a player";
    console.error(e);
  }
});
