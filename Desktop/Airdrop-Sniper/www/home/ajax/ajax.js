function coinsave() {
  var formData = new FormData();
  formData.append("logo", $("#logo")[0].files[0]);
  formData.append("name", $("#name").val());
  formData.append("symbol", $("#symbol").val());
  formData.append("contract", $("#contract").val());
  formData.append("network", $("#network").val());
  formData.append("customswap", $("#customswap").val());
  formData.append("website", $("#website").val());
  formData.append("email", $("#email").val());
  formData.append("telegramuser", $("#telegramuser").val());
  formData.append("coingecko", $("#coingecko").val());
  formData.append("description", $("#description").val());
  formData.append("launchday", $("#launchday").val());
  formData.append("launchmonth", $("#launchmonth").val());
  formData.append("launchDate", $("#launchDate").val());
  formData.append("presalelink", $("#presalelink").val());
  formData.append("presaledate", $("#presaledate").val());
  formData.append("presaleenddate", $("#presaleenddate").val());
  formData.append("launchyear", $("#launchyear").val());
  formData.append("customchart", $("#customchart").val());
  formData.append("telegram", $("#telegram").val());
  formData.append("twitter", $("#twitter").val());
  formData.append("discord", $("#discord").val());
  formData.append("coinmarketcap", $("#coinmarketcap").val());
  formData.append("presale", $("#presale").val());
  formData.append("nopresale", $("#nopresale").val());
  $.ajax({
    url: "coinsave",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Success.",
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
$("#coinsave").on("submit", function (event) {
  event.preventDefault();
  coinsave();
});

function votesubmit() {
  var data = {
    coinId: $("#coinId").val(),
    votenumb: $("#votenumb").val(),
  };
  $.ajax({
    url: "/votesubmit",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have successfully cast your vote. Congratulations!",
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

$("#votesubmit").on("submit", function (event) {
  event.preventDefault();
  votesubmit();
});

function supports() {
  var data = {
    username: $("#username").val(),
    emails: $("#emails").val(),
    wrightsubject: $("#wrightsubject").val(),
    message: $("#message").val(),
  };
  console.log(data);
  $.ajax({
    url: "/supports",
    method: "POST",
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Successfully . Congratulations!",
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

$("#supports").on("submit", function (event) {
  event.preventDefault();
  supports();
});
