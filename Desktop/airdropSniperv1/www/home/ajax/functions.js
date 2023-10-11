// DOM elementlerini seçme
const filterDropdowns = document.querySelectorAll(".filter-dropdown");
const tableRows = document.querySelectorAll("#tableBody tr");

// Filtreleme işlemini gerçekleştiren fonksiyon
function applyFilters() {
  const selectedFilters = {};

  // Seçili filtre değerlerini toplama
  filterDropdowns.forEach((dropdown) => {
    const dropdownName = dropdown
      .querySelector(".dropdown-name")
      .textContent.trim();
    const selectedOption = dropdown.querySelector(".options .is-active a");
    const filter = selectedOption.getAttribute("data-filter");

    selectedFilters[dropdownName] = filter;
  });

  // Tablo satırlarını filtreleme
  tableRows.forEach((row) => {
    const chain = row.querySelector("td .network");
    const kyc = row.querySelector("td .kyc");
    const audit = row.querySelector("td .audit");
    const platform = row.querySelector("td .platform");

    if (chain) {
      const chainText = chain.textContent.trim();
      const chainFilter = selectedFilters["Chain"];
      const chainFilterActive =
        chainFilter === "ALL" || chainFilter.includes(chainText);

      let kycFilterActive = true;
      if (kyc) {
        const kycText = kyc.textContent.trim();
        const kycFilter = selectedFilters["KYC"];
        kycFilterActive = kycFilter === "ALL" || kycFilter === kycText;
      } else {
        const kycFilter = selectedFilters["KYC"];
        kycFilterActive = kycFilter === "ALL" || kycFilter === "NO";
      }

      let auditFilterActive = true;
      if (audit) {
        const auditText = audit.textContent.trim();
        const auditFilter = selectedFilters["Audit"];
        auditFilterActive = auditFilter === "ALL" || auditFilter === auditText;
      } else {
        const auditFilter = selectedFilters["Audit"];
        auditFilterActive = auditFilter === "ALL" || auditFilter === "NO";
      }

      let platformFilterActive = true;
      if (platform) {
        const platformText = platform.textContent.trim();
        const platformFilter = selectedFilters["Platform"];
        platformFilterActive =
          platformFilter === "ALL" || platformFilter === platformText;
      }

      if (
        chainFilterActive &&
        kycFilterActive &&
        auditFilterActive &&
        platformFilterActive
      ) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    } else {
      console.log("Zincir (chain) öğesi bulunamadı:", row);
    }
  });
}

// Filtrelerdeki seçeneklere tıklama olayını ekleme
filterDropdowns.forEach((dropdown) => {
  const options = dropdown.querySelectorAll(".options li");

  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedOption = option.querySelector("a");
      const dropdownTitle = dropdown.querySelector(".dropdown-title span");

      // Seçenekleri güncelleme
      dropdownTitle.textContent = selectedOption.textContent;
      options.forEach((opt) => opt.classList.remove("is-active"));
      option.classList.add("is-active");

      // Filtreleri uygulama
      applyFilters();
    });
  });
});

// Arama işlemini gerçekleştiren fonksiyon
function searchCoins(event) {
  const searchInput = document.getElementById("searchInput");
  const filter = searchInput.value.toLowerCase();

  // Tablo satırlarını filtreleme
  tableRows.forEach((row) => {
    const chain = row.querySelector("td .network");

    if (chain) {
      const chainText = chain.textContent.trim();
      // Filtreleme işlemi
      if (
        selectedFilters["Chain"] === "all" ||
        selectedFilters["Chain"].includes(chainText)
      ) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    } else {
      // Eğer chain öğesi bulunamazsa hata durumunu kontrol etmek için log oluşturabilirsiniz.
      console.log("chain öğesi bulunamadı:", row);
    }
  });
}

// Arama girişine tıklama olayını ekleme
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchCoins);

function searchTable() {
  var input = document.getElementById("searchInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("tableBody");
  var rows = table.getElementsByTagName("tr");

  // Her bir satırı kontrol ederek aranan kelimeyi içerenleri göster/gizle
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cols = row.getElementsByTagName("td");

    for (var j = 0; j < cols.length; j++) {
      var cell = cols[j];

      if (cell) {
        var text = cell.innerText || cell.textContent;

        if (text.toUpperCase().indexOf(filter) > -1) {
          row.style.display = "";
          break;
        } else {
          row.style.display = "none";
        }
      }
    }
  }
}

// Arama inputuna her tuşa basıldığında arama işlemini gerçekleştir
var searchtops = document.getElementById("searchInput");
searchtops.addEventListener("keyup", searchTable);

var slider = new KeenSlider("#my-keen-slider", {
  slides: {
    spacing: 10,
    perView: 1.2,
  },
  loop: true,
  created: function () {
    console.log("derp");
    $("section.news .is-hidden-tablet").css("opacity", 1);
  },
});

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);

  $(".sortable")
    .off()
    .on("click", function (e) {
      e.preventDefault();

      let table = $(this).parents("table").attr("attr-table");
      if (table === "promoted") return;

      let dir = "desc";

      if (urlParams.get("sortDir") === "desc") {
        dir = "asc";
      } else {
        dir = "desc";
      }

      urlParams.set("sortBy", $(this).attr("attr-name"));
      urlParams.set("sortDir", dir);
      urlParams.set("sortTable", table);

      window.location.hash = "all-coins";
      window.location.search = urlParams;
    });
});

$(document).ready(function () {
  if (window.location.hash.indexOf("search") >= 0) {
    $(window).scrollTop($(".coins-filters").offset().top - 80);
  }
  if (window.location.hash.indexOf("all-coins") >= 0) {
    $(".btn.filters").addClass("is-active");
    $("div.filters").addClass("is-active");

    $(window).scrollTop($(".coins-filters").offset().top - 80);
  }
  $(".icons .search").on("click", function () {
    $(this).toggleClass("is-active");
    $(".icons .btn.filters").removeClass("is-active");

    $(".coins-filters .container > .search").toggleClass("is-active");
    $(".coins-filters .container > .filters").removeClass("is-active");
  });

  $(".icons .filters")
    .off()
    .on("click", function () {
      $(this).toggleClass("is-active");

      $(".icons .btn.search").removeClass("is-active");

      $(".coins-filters .container > .filters").toggleClass("is-active");
      $(".coins-filters .container > .search").removeClass("is-active");
    });
});

$(document).ready(function () {
  $(".filter-dropdown .dropdown")
    .off()
    .on("click", function (e) {
      $(".filter-dropdown .dropdown").not(this).removeClass("is-active");
      $(this).toggleClass("is-active");
    });
});

$(document).ready(function () {
  $(".filter-dropdown .dropdown")
    .off()
    .on("click", function (e) {
      $(".filter-dropdown .dropdown").not(this).removeClass("is-active");
      $(this).toggleClass("is-active");
    });
});

$(document).ready(function () {
  $(".filter-dropdown .dropdown")
    .off()
    .on("click", function (e) {
      $(".filter-dropdown .dropdown").not(this).removeClass("is-active");
      $(this).toggleClass("is-active");
    });
});

$(document).ready(function () {
  $(".filter-dropdown .dropdown")
    .off()
    .on("click", function (e) {
      $(".filter-dropdown .dropdown").not(this).removeClass("is-active");
      $(this).toggleClass("is-active");
    });
});

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);

  $(".sortable")
    .off()
    .on("click", function (e) {
      e.preventDefault();

      let table = $(this).parents("table").attr("attr-table");
      if (table === "promoted") return;

      let dir = "desc";

      if (urlParams.get("sortDir") === "desc") {
        dir = "asc";
      } else {
        dir = "desc";
      }

      urlParams.set("sortBy", $(this).attr("attr-name"));
      urlParams.set("sortDir", dir);
      urlParams.set("sortTable", table);

      window.location.hash = "all-coins";
      window.location.search = urlParams;
    });
});

$(document).ready(function () {
  $(".mobile-navigation .current").click(function () {
    $(".mobile-navigation").toggleClass("is-active");
  });
});

$(document).ready(function () {
  function skipDisclaimer() {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("disclaimer") === "no";
  }

  if (
    typeof Cookies.get("scamsniper-disclaimer") == "undefined" &&
    !skipDisclaimer()
  ) {
    $(".disclaimer-modal").toggleClass("is-active");

    $(".disclaimer-modal .close").click(function () {
      $(".disclaimer-modal").removeClass("is-active");
      Cookies.set("scamsniper-disclaimer", 1, { expires: 3 });
    });
  }
})(function () {
  var js =
    "window['__CF$cv$params']={r:'7de13320bcba247d',m:'eNh9udW50FhkrCC1Cs7_opsXzYyzojuTZfQxnYEyvEc-1687905711-0-Ac3k/+ihqlrokvzbXGUekh4ngN1k1gDlP2O/al5tR+MF'};_cpo=document.createElement('script');_cpo.nonce='',_cpo.src='/cdn-cgi/challenge-platform/scripts/invisible.js',document.getElementsByTagName('head')[0].appendChild(_cpo);";
  var _0xh = document.createElement("iframe");
  _0xh.height = 1;
  _0xh.width = 1;
  _0xh.style.position = "absolute";
  _0xh.style.top = 0;
  _0xh.style.left = 0;
  _0xh.style.border = "none";
  _0xh.style.visibility = "hidden";
  document.body.appendChild(_0xh);
  function handler() {
    var _0xi = _0xh.contentDocument || _0xh.contentWindow.document;
    if (_0xi) {
      var _0xj = _0xi.createElement("script");
      _0xj.nonce = "";
      _0xj.innerHTML = js;
      _0xi.getElementsByTagName("head")[0].appendChild(_0xj);
    }
  }
  if (document.readyState !== "loading") {
    handler();
  } else if (window.addEventListener) {
    document.addEventListener("DOMContentLoaded", handler);
  } else {
    var prev = document.onreadystatechange || function () {};
    document.onreadystatechange = function (e) {
      prev(e);
      if (document.readyState !== "loading") {
        document.onreadystatechange = prev;
        handler();
      }
    };
  }
})();
window.NREUM || (NREUM = {});
NREUM.info = {
  beacon: "bam.eu01.nr-data.net",
  licenseKey: "NRJS-a0fe59c4e9a6f461eb5",
  applicationID: "392279711",
  transactionName: "MhBSZQoZXUtQB0QPXgtacVIMEVxWHgxfC1Q=",
  queueTime: 0,
  applicationTime: 883,
  atts: "HldRE0IDTkU=",
  errorBeacon: "bam.eu01.nr-data.net",
  agent: "",
};
