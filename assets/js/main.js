const songApi = "http://localhost:3000/songs";
const postVnC1 = "http://localhost:3000/postVnc1";
const postVnC2 = "http://localhost:3000/postVnc2";
const postVnC3 = "http://localhost:3000/postVnc3";
const postUsC1 = "http://localhost:3000/postUSc1";
const postUsC2 = "http://localhost:3000/postUSc2";
const postUsC3 = "http://localhost:3000/postUSc3";
const postKC1 = "http://localhost:3000/postKc1";
const postKC2 = "http://localhost:3000/postKc2";
const postKC3 = "http://localhost:3000/postKc3";
const postCnC1 = "http://localhost:3000/postCc1";
const postCnC2 = "http://localhost:3000/postCc2";
const postCnC3 = "http://localhost:3000/postCc3";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playing = $(".footer");
const listSong = $(".list-song");
const songName = $(".cd-heading h2");
const singerName = $(".cd-heading h4");
const cdThumb = $(".cd-thumb");
const cdNodeList = $(".cd-nodes-list");
const btnPlaying = $(".btn-toggle-play");
const btnPrev = $(".btn-prev");
const btnNext = $(".btn-next");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");
const timeLeft = $(".time-left");
const timeRight = $(".time-right");
const btnMute = $(".form__volume--icon");
const progressVolume = $(".progress-volume");
const audio = $("#audio");
const progress = $("#progress");
const navUsers = $$(".profile__user-nav-item");
const blockNavUsers = $$(".container-item");
const themeBtn = $(".header__control-theme");
const modalTheme = $(".theme__modal");
const closeModal = $(".theme__modal-container-close");
const navSidebars = $$(".nav__item");
const blockContainers = $$(".container-page");
const scrollSidebar = $(".nav__sidebar-scroller");
const btnUserHeader = $(".header__user");
const vnCot1 = $(".vn-cot-1");
const vnCot2 = $(".vn-cot-2");
const vnCot3 = $(".vn-cot-3");
const usCot1 = $('.us-cot-1');
const usCot2 = $('.us-cot-2');
const usCot3 = $('.us-cot-3');
const kCot1 = $('.k-cot-1');
const kCot2 = $('.k-cot-2');
const kCot3 = $('.k-cot-3');
const cnCot1 = $(".cn-cot-1");
const cnCot2 = $(".cn-cot-2");
const cnCot3 = $(".cn-cot-3");
const navPageFollow = $$('.nav__page-follow-item');
const blockPageFollow = $$('.page__follow');
const blockSidebar = $('.sidebar');
const btnShowSidebar = $('.btn-show-sidebar-tablet');
const songNameOnMobile = $('.m_form-desc h2');
const singerNameOnMobile = $('.m_form-desc h4');
const cdThumbOnMoblie = $('.m_form-cd-img');
const btnPlayingOnMobile = $('.btn-toggle-play-on-mobile');
const btnPrevOnMobile = $('.btn-prev-on-mobile');
const btnNextOnMobile = $('.btn-next-on-mobile');
const playingOnMobile = $('.playing_on-mobile');
const btnClosePlayingOnmobile = $('.playing_zoom-out');

function getSongs(callback) {
  fetch(songApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

getSongs(function (songs) {
  const app = {
    currentIndex: 0,
    curentVolume: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: songs,
    render: function () {
      const htmls = this.songs.map((song, index) => {
        return `
                <div class="col l-3 m-6 c-12 song ${
                  index === this.currentIndex ? "active" : ""
                }" data-index="${index}"">
                    <div class="song__item">
                        <div class="song__item-layout-1">
                            <img src='${
                              song.image
                            }' alt="" class="song__item-img">
                            <div class="song__item-desc">
                              <h3 class="song__item-name">${song.name}</h3>
                              <p class="song__item-singer">${song.singer}</p>
                            </div>
                            <div class="song__item-option">
                              <span class="song__item-option-heart">
                                <i class="ti-heart"></i>
                              </span>
                              <span class="song__item-option-more">
                                <i class="ti-more-alt"></i>
                              </span>
                            </div>
                        </div>
                        <div class="song__item-layout-2">
                            <div class="song__item-layout-2-btn-play">
                                <img class="pause-icon" src="./assets/img/icon-playing.gif"></img>
                                <i class="ti-control-play play-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                `;
      });
      listSong.innerHTML = htmls.join("");
    },

    defineProperties: function () {
      Object.defineProperty(this, "currentSong", {
        get: function () {
          return this.songs[this.currentIndex];
        },
      });
    },

    handleEvents: function () {
      const _this = this;

      //Xử lý quay CD
      const cdAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
        duration: 15000,
        iterations: Infinity,
      });
      cdAnimate.pause();

      // Xử lý sự kiện play/pause Song
      btnPlaying.onclick = function () {
        // var isSucces = playing.classList.toggle('playing');
        // if(isSucces) {
        //     audio.play();
        // } else {
        //     audio.pause();
        // }
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      };

      btnPlayingOnMobile.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }

      //Khi song được play
      audio.onplay = function () {
        _this.isPlaying = true;
        playing.classList.add("playing");
        playingOnMobile.classList.add("playing");
        listSong.classList.add("playing");
        cdAnimate.play();
        cdNodeList.classList.add("active");
      };

      //Khi song bị pause
      audio.onpause = function () {
        _this.isPlaying = false;
        playing.classList.remove("playing");
        playingOnMobile.classList.remove("playing");
        listSong.classList.remove("playing");
        cdAnimate.pause();
        cdNodeList.classList.remove("active");
      };

      //Xử lý thanh progress khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function () {
        if (!audio.duration == !NaN) {
          timeRight.innerText = "0:0";
        } else {
          const integer = Math.floor(audio.duration / 60);
          const remainder = Math.floor(audio.duration % 60);
          timeRight.innerText = `${integer}:${remainder}`;
        }
        const progressPersent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPersent;
        if (audio.currentTime < 60) {
          timeLeft.innerText = `0:${Math.floor(audio.currentTime)}`;
        } else {
          const a = Math.floor(audio.currentTime / 60);
          const b = Math.floor(audio.currentTime % 60);
          timeLeft.innerText = `${a}:${b}`;
        }
      };

      //Xử lý progress  khi tua song
      progress.oninput = function (e) {
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        if (audio.currentTime < 60) {
          timeLeft.innerText = `0:${Math.floor(audio.currentTime)}`;
        } else {
          const a = Math.floor(audio.currentTime / 60);
          const b = Math.floor(audio.currentTime % 60);
          timeLeft.innerText = `${a}:${b}`;
        }
      };

      //Xử lý sự kiện khi next song
      btnNext.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
        } else {
          _this.nextSong();
        }
        _this.render();
        audio.play();
      };

      //Xử lý sự kiện khi next song trên mobile
      btnNextOnMobile.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
        } else {
          _this.nextSong();
        }
        _this.render();
        audio.play();
      }

      //Xử lý sự kiện khi prev song
      btnPrev.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
        } else {
          _this.prevSong();
        }
        _this.render();
        audio.play();
      };

      //Xử lý sự kiện khi prev song trên mobile
      btnPrevOnMobile.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
        } else {
          _this.prevSong();
        }
        _this.render();
        audio.play();
      }

      //Xử lý sự kiện khi nhấn nút random
      btnRandom.onclick = function () {
        _this.isRandom = !_this.isRandom;
        btnRandom.classList.toggle("active", _this.isRandom);
      };

      //Xử lý sự kiện khi nhấn nút repeat
      btnRepeat.onclick = function () {
        _this.isRepeat = !_this.isRepeat;
        btnRepeat.classList.toggle("active", _this.isRepeat);
      };

      //Xử lý sự kiện khi nhấn nút play trong danh sách bài hát
      listSong.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");
        const btnTogglePlayInSongList = e.target.closest(
          ".song__item-layout-2-btn-play"
        );
        const checkOption = e.target.closest(".song__item-option");
        if (btnTogglePlayInSongList && !checkOption) {
          btnTogglePlayInSongList.classList.toggle("active");
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          } else {
            audio.play();
          }
        }
      };

      //Xử lý sự kiện khi mở trình phát nhạc trên mobile
      playingOnMobile.onclick = function (e) {
          if(!e.target.closest('.m_form-control')) {
            playing.classList.add('active');
          }
      }
      //Xử lý sự kiện khi đóng trình phát nhạc trên mobile
      btnClosePlayingOnmobile.onclick = function () {
        playing.classList.remove('active');
      }

      //Xử lý sự kiện khi bật tắt âm thanh
      btnMute.onclick = function () {
        btnMute.classList.toggle("active");
        if (btnMute.className == "form__volume--icon active") {
          audio.muted = true;
        } else {
          audio.muted = false;
        }
      };

      //Xử lý sự kiện khi thay đổi volume
      progressVolume.oninput = function (e) {
        audio.volume = e.target.value / 100;
      };

      //Xử lý sự kiện khi hết bài hát
      audio.onended = function () {
        if (_this.isRepeat) {
          audio.play();
        } else {
          btnNext.click();
        }
      };

      //Xử lý sự kiện khi click navigation ở page user
      navUsers.forEach(function (navUser, index) {
        navUser.onclick = function () {
          $(".profile__user-nav-item.active").classList.remove("active");
          this.classList.add("active");
          if (index === 0) {
            $(".container-item.active").classList.remove("active");
            blockNavUsers[0].classList.add("active");
            blockNavUsers[1].classList.add("active");
          } else {
            const a = $$(".container-item.active");
            for (let i = 0; i < a.length; i++) {
              a[i].classList.remove("active");
            }
            blockNavUsers[index - 1].classList.add("active");
          }
        };
      });

      //Xử lý sự kiện khi click navigation ở sidebar
      navSidebars.forEach(function (navSidebar, index) {
        navSidebar.onclick = function () {
          $(".nav__item.active").classList.remove("active");
          navSidebar.classList.add("active");
          if (index === 3) {
            blockContainers[4].classList.add("active");
            blockSidebar.classList.add('active');
            btnShowSidebar.classList.remove('active');
            setTimeout(function () {
              blockContainers[4].classList.remove("active");
            }, 3000);
          } else if (index === 4) {
            $(".container-page.active").classList.remove("active");
            blockContainers[3].classList.add("active");
            blockSidebar.classList.add('active');
            btnShowSidebar.classList.remove('active');
          } else {
            $(".container-page.active").classList.remove("active");
            blockContainers[index].classList.add("active");
            blockSidebar.classList.add('active');
            btnShowSidebar.classList.remove('active');
          }
          // else if(index === 0){
          //     $('.container-page.active').classList.remove('active');
          //     blockContainers[index].classList.add('active');
          // }
        };
      });

      //Xử lý đóng mở sidebar trên tablet
      btnShowSidebar.onclick = function () {
        btnShowSidebar.classList.toggle('active');
        blockSidebar.classList.toggle('active');
      }
    },

    loadCurrentSong: function () {
      songName.innerText = this.currentSong.name;
      singerName.innerText = this.currentSong.singer;
      cdThumb.style.backgroundImage = "url(" + this.currentSong.image + ")";
      songNameOnMobile.innerText = this.currentSong.name;
      singerNameOnMobile.innerText = this.currentSong.singer;
      cdThumbOnMoblie.style.backgroundImage = "url(" + this.currentSong.image + ")";
      audio.setAttribute("src", this.currentSong.path);
    },

    //Khi next song
    nextSong: function () {
      this.currentIndex++;
      if (this.currentIndex > this.songs.length - 1) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },

    //Khi prev song
    prevSong: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    },

    //Khi random song
    randomSong: function () {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.songs.length);
      } while (newIndex === this.currentIndex);
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },

    start: function () {
      this.defineProperties();

      this.handleEvents();

      this.loadCurrentSong();

      this.render();
    },
  };

  app.start();
});

// btnUserHeader.onclick = function (e) {
//   $(".nav__item.active").classList.remove("active");
//   navSidebars[0].classList.add("active");
//   blockContainers[0].classList.add("active");
// };

scrollSidebar.onmouseover = function () {
  scrollSidebar.classList.add("active");
};

scrollSidebar.onmouseout = function () {
  scrollSidebar.classList.remove("active");
};

function getPostVnC1(callback) {
  fetch(postVnC1)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

getPostVnC1(function (posts) {
    const htmls = posts.map(function (post) {
        return `
            <div class="vn__blog-item">
                <div class="blog__profile-user">
                    <div class="blog__profile-user-avt">
                        <img src='${post.userAvt}' alt="">
                    </div>
                    <div class="blog__profile-user-info">
                        <h4 class="blog__profile-user-name">${post.userName}</h4>
                        <p class="blog__profile-user-time">${post.postTime}</p>
                    </div>
                </div>
                <h3 class="blog__item-caption">${post.caption}</h3>
                <div class="blog__item-img">
                    <img src='${post.postImg}' alt="">
                </div>
                <div class="blog__item-feel">
                    <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
                    <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
                </div>
            </div>
        `;
    });
    vnCot1.innerHTML = htmls.join('');
});

function getPostVnC2(callback) {
    fetch(postVnC2)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
  
getPostVnC2(function (posts) {
    const htmls = posts.map(function (post) {
        return `
            <div class="vn__blog-item">
                <div class="blog__profile-user">
                    <div class="blog__profile-user-avt">
                        <img src='${post.userAvt}' alt="">
                    </div>
                    <div class="blog__profile-user-info">
                        <h4 class="blog__profile-user-name">${post.userName}</h4>
                        <p class="blog__profile-user-time">${post.postTime}</p>
                    </div>
                </div>
                <h3 class="blog__item-caption">${post.caption}</h3>
                <div class="blog__item-img">
                    <img src='${post.postImg}' alt="">
                </div>
                <div class="blog__item-feel">
                    <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
                    <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
                </div>
            </div>
        `;
    });
    vnCot2.innerHTML = htmls.join('');
});


function getPostVnC3(callback) {
    fetch(postVnC3)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
  
getPostVnC3(function (posts) {
    const htmls = posts.map(function (post) {
        return `
            <div class="vn__blog-item">
                <div class="blog__profile-user">
                    <div class="blog__profile-user-avt">
                        <img src='${post.userAvt}' alt="">
                    </div>
                    <div class="blog__profile-user-info">
                        <h4 class="blog__profile-user-name">${post.userName}</h4>
                        <p class="blog__profile-user-time">${post.postTime}</p>
                    </div>
                </div>
                <h3 class="blog__item-caption">${post.caption}</h3>
                <div class="blog__item-img">
                    <img src='${post.postImg}' alt="">
                </div>
                <div class="blog__item-feel">
                    <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
                    <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
                </div>
            </div>
        `;
    });
    vnCot3.innerHTML = htmls.join('');
});


function getPostUsC1(callback) {
  fetch(postUsC1)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostUsC1(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="us__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  usCot1.innerHTML = htmls.join("");
})


function getPostUsC2(callback) {
  fetch(postUsC2)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostUsC2(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="us__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  usCot2.innerHTML = htmls.join("");
})

function getPostUsC3(callback) {
  fetch(postUsC3)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostUsC3(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="us__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  usCot3.innerHTML = htmls.join("");
})

function getPostKC1(callback) {
  fetch(postKC1)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostKC1(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="k__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  kCot1.innerHTML = htmls.join("");
})


function getPostKC2(callback) {
  fetch(postKC2)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostKC2(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="k__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  kCot2.innerHTML = htmls.join("");
})

function getPostKC3(callback) {
  fetch(postKC3)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostKC3(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="k__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  kCot3.innerHTML = htmls.join("");
})

function getPostCnC1(callback) {
  fetch(postCnC1)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostCnC1(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="cn__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  cnCot1.innerHTML = htmls.join("");
})


function getPostCnC2(callback) {
  fetch(postCnC2)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostCnC2(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="cn__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  cnCot2.innerHTML = htmls.join("");
})

function getPostCnC3(callback) {
  fetch(postCnC3)
    .then(function(response) {
      return response.json();
    })
    .then(callback);
}

getPostCnC3(function (posts) {
  const htmls = posts.map(function (post) {
    return `
    <div class="cn__blog-item">
        <div class="blog__profile-user">
            <div class="blog__profile-user-avt">
                <img src='${post.userAvt}' alt="">
            </div>
            <div class="blog__profile-user-info">
                <h4 class="blog__profile-user-name">${post.userName}</h4>
                <p class="blog__profile-user-time">${post.postTime}</p>
            </div>
        </div>
        <h3 class="blog__item-caption">${post.caption}</h3>
        <div class="blog__item-img">
            <img src='${post.postImg}' alt="">
        </div>
        <div class="blog__item-feel">
            <span class="blog__item-feel-heart"><i class="ti-heart"></i> ${post.quantityHeart}</span>
            <span class="blog__item-feel-cmt"><i class="ti-comment"></i> ${post.quantityCmt}</span>
        </div>
    </div>
  `;
  })
  cnCot3.innerHTML = htmls.join("");
})

//Xử lý sự kiên khi nhấn nav trong page follow

navPageFollow.forEach(function(navFollow, index) {
  navFollow.onclick = function () {
    $('.nav__page-follow-item.active').classList.remove('active');
    navFollow.classList.add('active');
    $('.page__follow.active').classList.remove('active');
    blockPageFollow[index].classList.add('active');
  }
})

const itemModal = $$('.theme__modal-body-item');
const root = $(':root');
//Xử lý sự kiện khi click xem trước trong modal theme
const btnViewTheme = $$('.modal__item-sub-btn-view')
  btnViewTheme.forEach(function (btnView, index) {
    btnView.onclick = function () {
      const check = $('.modal__item-sub-btn-view.active');
      if(check != null) {
        check.classList.remove('active');
        btnView.classList.add('active');
        if(index == 0) {
          root.setAttribute('data-theme', 'dark')
        } else if(index == 1) {
          root.setAttribute('data-theme', '')
        } else if(index == 2) {
          root.setAttribute('data-theme', 'green')
        } else {
          root.setAttribute('data-theme', 'blue-sea')
        }
      } else {
        btnView.classList.add('active');
        if(index == 0) {
          root.setAttribute('data-theme', 'dark')
        } else if(index == 1) {
          root.setAttribute('data-theme', '')
        } else if(index == 2) {
          root.setAttribute('data-theme', 'green')
        } else {
          root.setAttribute('data-theme', 'blue-sea')
        }
      }
    }
  })

//Xử lý sự kiện chuyển đổi theme
const btnApllyTheme = $$('.modal__item-sub-btn-apply');
window.onload = function () {
  btnApllyTheme.forEach(function(btnAplly, index) {
    btnAplly.onclick = function () {
      if(index === 0) {
        $('.theme__modal-body-item.active').classList.remove('active');
        itemModal[index].classList.add('active')
        root.setAttribute('data-theme', 'dark')
      } else if(index === 1) {
        $('.theme__modal-body-item.active').classList.remove('active');
        itemModal[index].classList.add('active')
        root.setAttribute('data-theme', '')
      } else if(index === 2) {
        $('.theme__modal-body-item.active').classList.remove('active');
        itemModal[index].classList.add('active')
        root.setAttribute('data-theme', 'green')
      } else {
        $('.theme__modal-body-item.active').classList.remove('active');
        itemModal[index].classList.add('active')
        root.setAttribute('data-theme', 'blue-sea')
      }
    }
  })
}

//Xử lý sự kiện đóng mở modal theme
themeBtn.onclick = function () {
  modalTheme.classList.add("active");
};

closeModal.onclick = function () {
  const check = $('.modal__item-sub-btn-view.active');
  if(check != null) {
    check.classList.remove('active');
    if(itemModal[0].className == 'theme__modal-body-item active') {
      root.setAttribute('data-theme', 'dark')
    } else if(itemModal[1].className == 'theme__modal-body-item active') {
      root.setAttribute('data-theme', '')
    } else if(itemModal[2].className == 'theme__modal-body-item active') {
      root.setAttribute('data-theme', 'green')
    } else if(itemModal[3].className == 'theme__modal-body-item active') {
      root.setAttribute('data-theme', 'blue-sea')
    }
  }
  modalTheme.classList.remove("active");
};