const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const kakaoBtn = document.getElementById('kakao');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

twitterBtn.addEventListener('click', () => {
  tweetQuote();
});
newQuoteBtn.addEventListener('click', () => {
  getQuote();
});
kakaoBtn.addEventListener('click', () => {
  sendKakaoQuote();
});

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// get quote from api
const getQuote = async () => {
  try {
    showLoadingSpinner();
    const proxyUrl = 'https://stormy-lowlands-87036.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    quoteText.textContent = data.quoteText;
    // Dynamically reduce font size for long quotes
    data.quoteText.length > 50 && quoteText.classList.add('long-quote');
    //author
    authorText.textContent = data.quoteAuthor || 'unknown';
    removeLoadingSpinner();
  } catch (error) {
    console.log('error getting quote :', error);
    getQuote();
  }
};

// tweet quotes
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(twitterUrl, '_blank');
};

// share quotes to KaKao
Kakao.init('4cd06358213b07d661872fc63b5cf362');

const sendKakaoQuote = () => {
  const newImg = `https://picsum.photos/id/${Math.ceil(Math.random() * 1000)}/200`; //get random image

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'quotes to think',
      description: `${quoteText.innerText} \n-${authorText.innerText}`,
      imageUrl: newImg,
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        androidExecParams: 'test'
      }
    }
  });
};

getQuote();
