function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const body = document.body;

window.addEventListener('keydown', function(e) {
	if (e.key === 'ArrowDown') {
		moveVertical(avatar, 50);
		avatar.style.transform = 'rotate(90deg)';

	}
	else if (e.key === 'ArrowUp') {
		moveVertical(avatar, -50);
		avatar.style.transform = 'rotate(-90deg)';

	}
	else if (e.key === 'ArrowRight') {
		moveHorizontal(avatar, 50);
		avatar.style.transform = 'scale(1,1)';
	}
	else if (e.key === 'ArrowLeft') {
		moveHorizontal(avatar, -50);
		avatar.style.transform = 'scale(-1,1)';
	}
	if (isTouching(avatar, coin)) {
		moveCoin();
		body.style.backgroundColor = '#26ff00';
		setTimeout(() => {
			body.style.backgroundColor = '';
		}, 70);
	}
});

const moveVertical = (element, amount) => {
	const currTop = extractPos(element.style.top);
	const newTop = currTop + amount;

    if (newTop < 0) {
        element.style.top = `0px`; 
    } else if (newTop > (window.innerHeight - 100)) {
        element.style.top = `${window.innerHeight - 100}px`;
    } else {
        element.style.top = `${newTop}px`;
    }
};

const moveHorizontal = (element, amount) => {
	const currLeft = extractPos(element.style.left);
	const newLeft = currLeft + amount;

	if (newLeft < 0) {
		element.style.left = `0px`;
	} else if (newLeft > (window.innerWidth - 100)) {
		element.style.left = `${window.innerWidth - 100}px`;
	} else {
        element.style.left = `${newLeft}px`;
    }
};

const extractPos = (pos) => {
  if (!pos) return 100;
  return parseInt(pos.slice(0, -2));
};

const generateRandomPosition = () => {
  const y = Math.floor(Math.random() * (window.innerHeight - 50));
  const x = Math.floor(Math.random() * (window.innerWidth - 50));

  return { x, y };
};

const isCloseToAvatar = ({ x, y }) => {
  const avatarSize = avatar.height;
  const coinSize = coin.height;

  const distanceThreshold = 100;

  const avatarCenterX = extractPos(avatar.style.left) + avatarSize / 2;
  const avatarCenterY = extractPos(avatar.style.top) + avatarSize / 2;

  const coinCenterX = x + coinSize / 2;
  const coinCenterY = y + coinSize / 2;

  return (
    Math.abs(avatarCenterX - coinCenterX) < distanceThreshold &&
    Math.abs(avatarCenterY - coinCenterY) < distanceThreshold
  );
};

const moveCoin = () => {
  let isClose;

  do {
    const { x, y } = generateRandomPosition();

    isClose = isCloseToAvatar({ x, y });

    coin.style.top = `${y}px`;
    coin.style.left = `${x}px`;
  } while (isClose);
};

moveCoin();
