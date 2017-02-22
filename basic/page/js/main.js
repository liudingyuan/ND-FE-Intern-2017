(function () {

	//rem
	var designWidth = 375, rem2px = 100;
	document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px + 'px'; 

	let isMobile = false;
	let isOpen = false;
	const iconGithub = document.querySelector('.icon-github');
	const headMenu = document.querySelector('.h-menu');
	const menuList = document.querySelector('.h-nav ul');

	//判断是否是移动设备
	isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);

	if (isMobile) {
		iconGithub.classList.add('hide');
		headMenu.classList.remove('hide');
	}
	else {
		iconGithub.classList.remove('hide');
		headMenu.classList.add('hide');
	}

	function toggleMenu () {
		isOpen = !isOpen;

		if (isOpen) {
			menuList.style.height = 100 + '%';
		}
		else {menuList.style.height = 0;}
	}

	headMenu.addEventListener('click', function () {
		toggleMenu();
	}, false);
})();