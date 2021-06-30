import "@reach/combobox/styles.css";

const ClearSearchButton = ({ cleanInput, setCardSpot ,setSuggestions}) => {
  return (
    <button
      className="clearsearch"
      onClick={() => {
        cleanInput();
        let card = document.getElementById("card");
        if (card) {
          //如果是null不會進去
          card.style.display = "none";
        }

        setCardSpot(null);
        //setSuggestions([])
        //console.log(cardSpot)
      }}
    >
      <img src="close.svg.png" width="20" height="20" alt="close" />
    </button>
  );
};

export default ClearSearchButton;
