function siteBilgiGuncelle() {
  var formData = new FormData();
  var anahtar = $('input[name="anahtar"]').val();
  formData.append("title", $("#title").val());
  formData.append("description", $("#description").val());
  formData.append("anahtar", anahtar);
  formData.append("url", $("#url").val());
  formData.append("twitter", $("#twitter").val());
  formData.append("telegram", $("#telegram").val());
  formData.append("discord", $("#discord").val());
  formData.append("instagram", $("#instagram").val());
  formData.append("analiyctics", $("#analiyctics").val());
  formData.append("logo", $("#logo")[0].files[0]);
  formData.append("favicon", $("#favicon")[0].files[0]);
  $.ajax({
    url: "sitekaydet",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Güncelleme başarıyla tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(function () {
        location.reload(); // Sayfayı yenile
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bir Hata Oluştu",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });
}

// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$("#sitekaydet").on("submit", function (event) {
  event.preventDefault();
  siteBilgiGuncelle();
});

function airdrops() {
  var data = {
    baslik: $("#baslik").val(),
    saribaslik: $("#saribaslik").val(),
    altbaslik: $("#altbaslik").val(),
    butonadi: $("#butonadi").val(),
    baslangic: $("#baslangic").val(),
    bitis: $("#bitis").val(),
    url: $("#url").val(),
  };
  $.ajax({
    url: "airdrops",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Güncelleme Başarıyla Tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          showConfirmButton: false,
          timer: 6000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Errors",
          showConfirmButton: false,
          timer: 6000,
        });
      }
    },
  });
}

$("#airdrops").on("submit", function (event) {
  event.preventDefault();
  airdrops();
});

function anasayfaayar() {
  var data = {
    favorite: $("#favorite").val(),
    favoritealtad: $("#favoritealtad").val(),
    newlist: $("#newlist").val(),
    newlistaltad: $("#newlistaltad").val(),
    altbaslik: $("#altbaslik").val(),
    altad: $("#altad").val(),
    biralt: $("#biralt").val(),
    biraltad: $("#biraltad").val(),
  };
  $.ajax({
    url: "anasayfaayar",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Güncelleme Başarıyla Tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          showConfirmButton: false,
          timer: 6000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Errors",
          showConfirmButton: false,
          timer: 6000,
        });
      }
    },
  });
}

$("#anasayfaayar").on("submit", function (event) {
  event.preventDefault();
  anasayfaayar();
});

function reklamguncelle() {
  var formData = new FormData();
  formData.append("reklamlar", $("#reklamlar")[0].files[0]);
  formData.append("reklamlarurl", $("#reklamlarurl").val());
  formData.append("reklamlar2", $("#reklamlar2")[0].files[0]);
  formData.append("reklamlarurl2", $("#reklamlarurl2").val());
  formData.append("reklamlar3", $("#reklamlar3")[0].files[0]);
  formData.append("reklamlarurl3", $("#reklamlarurl3").val());
  formData.append("reklamlar4", $("#reklamlar4")[0].files[0]);
  formData.append("reklamlarurl4", $("#reklamlarurl4").val());

  $.ajax({
    url: "reklamguncelle",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Güncelleme başarıyla tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(function () {
        location.reload(); // Sayfayı yenile
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bir Hata Oluştu",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });
}

// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$("#reklamguncelle").on("submit", function (event) {
  event.preventDefault();
  reklamguncelle();
});

function reklamsil(gorselAdi) {
  $.ajax({
    url: "/nadminpanel/sil",
    method: "POST",
    data: { gorselAdi: gorselAdi },
    success: function (response) {
      $('img[src="/coinimages/' + gorselAdi + '"]').remove(); // Sadece hedeflenen görseli kaldır
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function coinekle() {
  var formData = new FormData();

  formData.append("coinname", $("#coinname").val());
  formData.append("symbol", $("#symbol").val());
  formData.append("contract", $("#contract").val());
  formData.append("ozeldex", $("#ozeldex").val());
  formData.append("website", $("#website").val());
  formData.append("email", $("#email").val());
  formData.append("telegram", $("#telegram").val());
  formData.append("coingecko", $("#coingecko").val());
  formData.append("telegramgrup", $("#telegramgrup").val());
  formData.append("twitter", $("#twitter").val());
  formData.append("discord", $("#discord").val());
  formData.append("coinmarketcap", $("#coinmarketcap").val());
  formData.append("onsatislink", $("#onsatislink").val());
  formData.append("network", $("#network").val());
  formData.append("kyc", $("#kyc").val());
  formData.append("audit", $("#audit").val());
  formData.append("aktif", $("#aktif").val());
  formData.append("presale", $("#presale").val());
  formData.append("presaledate", $("#presaledate").val());
  formData.append("presaleenddate", $("#presaleenddate").val());
  formData.append("nopresale", $("#nopresale").val());
  formData.append("baslamatarihi", $("#baslamatarihi").val());
  formData.append("codeblock", $("#codeblock").val());
  formData.append("promoted", $("#promoted").val());
  formData.append("logo", $("#logo")[0].files[0]);

  $.ajax({
    url: "coinekle",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Ekleme başarıyla tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(function () {
        location.reload(); // Sayfayı yenile
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bir Hata Oluştu",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });
}

// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$("#coinekle").on("submit", function (event) {
  event.preventDefault();
  coinekle();
});

function puanarttir(coinId, action) {
  var data = {
    coinId: coinId,
    action: action,
  };
  $.ajax({
    url: "puanisle",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Güncelleme Başarıyla Tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Bir hata oluştu.",
        showConfirmButton: false,
        timer: 3000,
      });
    },
  });
}

$(document).on("submit", ".puanarttir-form", function (event) {
  event.preventDefault();
  var coinId = $(this).find("button").data("coinid");
  puanarttir(coinId, "arttir");
});

$(document).on("submit", ".puanazalt-form", function (event) {
  event.preventDefault();
  var coinId = $(this).find("button").data("coinid");
  puanarttir(coinId, "azalt");
});

function toggleStatus(coinId, status) {
  var data = {
    coinId: coinId,
    status: status,
  };
  $.ajax({
    url: "togglestatus",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Durum Başarıyla Güncellendi.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Bir hata oluştu.",
        showConfirmButton: false,
        timer: 3000,
      });
    },
  });
}

$(document).on("change", ".form-check-input", function () {
  var coinId = $(this).data("coinid");
  var status = $(this).is(":checked");
  toggleStatus(coinId, status);
});

function coinguncelle() {
  var formData = new FormData();

  formData.append("coinname", $("#coinname").val());
  formData.append("symbol", $("#symbol").val());
  formData.append("contract", $("#contract").val());
  formData.append("ozeldex", $("#ozeldex").val());
  formData.append("website", $("#website").val());
  formData.append("email", $("#email").val());
  formData.append("telegram", $("#telegram").val());
  formData.append("coingecko", $("#coingecko").val());
  formData.append("telegramgrup", $("#telegramgrup").val());
  formData.append("twitter", $("#twitter").val());
  formData.append("discord", $("#discord").val());
  formData.append("coinmarketcap", $("#coinmarketcap").val());
  formData.append("onsatislink", $("#onsatislink").val());
  formData.append("network", $("#network").val());
  formData.append("kyc", $("#kyc").val());
  formData.append("audit", $("#audit").val());
  formData.append("aktif", $("#aktif").val());
  formData.append("presale", $("#presale").val());
  formData.append("presaledate", $("#presaledate").val());
  formData.append("presaleenddate", $("#presaleenddate").val());
  formData.append("nopresale", $("#nopresale").val());
  formData.append("baslamatarihi", $("#baslamatarihi").val());
  formData.append("codeblock", $("#codeblock").val());
  formData.append("coinsId", $("#coinsId").val());
  formData.append("promoted", $("#promoted").val());
  formData.append("logo", $("#logo")[0].files[0]);
  $.ajax({
    url: "coinguncelle",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Güncelleme başarıyla tamamlandı.",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(function () {
        location.reload(); // Sayfayı yenile
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bir Hata Oluştu",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });
}

// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$("#coinguncelle").on("submit", function (event) {
  event.preventDefault();
  coinguncelle();
});

function nadminlogin() {
  var data = {
    email: $("#email").val(),
    sifre: $("#sifre").val(),
  };

  $.ajax({
    url: "nadminlogin",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Giriş Başarılı Yönlendiriliyorsunuz",
        showConfirmButton: false,
        timer: 4000,
      });
      setTimeout(() => {
        window.location.href = "/nadminpanel";
      }, 4000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bir Hata Oluştu",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });
}

$("#nadminlogin").on("submit", function (event) {
  event.preventDefault();
  nadminlogin();
});

function adminbilgi() {
  var data = {
    uyemail: $("#uyemail").val(),
    uyesifre: $("#uyesifre").val(),
  };
  console.log(data);
  $.ajax({
    url: "adminbilgi",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Admin Bilgileri Başarıyla Güncellenmiştir...",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function (error) {
      var errorResponse = JSON.parse(error.responseText);
      if (errorResponse.errors) {
        // Hata mesajı varsa göster
        var errorMessage = errorResponse.errors.join(" ");
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bir Hata Oluştu",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  });
}
$("#adminbilgi").on("submit", function (event) {
  event.preventDefault();
  adminbilgi();
});

function coinsil(id) {
  if (confirm("Silmek istediğinize emin misiniz?")) {
    $.ajax({
      url: "coins/coinsil/" + id,
      type: "DELETE",
      success: function (result) {
        Swal.fire({
          title: "Başarılı!",
          text: "Silme işlemi başarıyla tamamlandı.",
          icon: "success",
          confirmButtonText: "Tamam",
        }).then(function () {
          window.location.reload();
        });
      },
      error: function (err) {
        console.error("Silme işlemi hatası", err);
      },
    });
  }
}
