var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var sites = [];

if (localStorage.getItem("sitesKey") != null) {
  sites = JSON.parse(localStorage.getItem("sitesKey"));

  display();
}

function getSite() {
  let siteNameValue = siteName.value.trim();
  let siteUrlValue = siteUrl.value.trim();
  // console.log(siteNameValue.length);

  var alertString = `
        <div class="text-start mt-2">
          <p class="text-center fw-bold">Please follow the rules below :</p>
          <ul>
            <li class="pb-2 list-unstyled fw-semibold">
              <i class="fa-solid fa-circle-arrow-right text-danger me-1"></i>  
              Site name must contain at least 3 characters
            </li>

            <li class="list-unstyled fw-semibold">
              <i class="fa-solid fa-circle-arrow-right text-danger me-1"></i>  
              Please enter a valid URL (https://example.com)
            </li>
          </ul>
        </div>`;

  if (siteNameValue.length < 3 || siteNameValue == "") {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid!",
      html: alertString,
    });
    return;
  }
  if (
    !siteUrlValue.startsWith("http://") &&
    !siteUrlValue.startsWith("https://")
  ) {
    siteUrlValue = "https://" + siteUrlValue;
  }

  if (!isUrlValid(siteUrlValue)) {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid!",
      html: alertString,
    });
    return;
  }

  var site = {
    site_name: siteNameValue,
    site_url: siteUrlValue,
  };

  sites.push(site);
  localStorage.setItem("sitesKey", JSON.stringify(sites));

  display();
  clear();
}

function display() {
  var tmp = "";

  for (var i = 0; i < sites.length; i++) {
    tmp += `
            <tr class="text-center">
              <td>${i + 1}</td>
              <td>${sites[i].site_name}</td>
              <td> 
                <a href="${sites[i].site_url}" target="_blank">
                  <button class="btn btn-success""> 
                    <i class="fa-solid fa-eye"></i>
                    Visit
                  </button> 
                </a>
              </td>
              <td> 
                <button class="btn btn-danger" onclick="deleteSite(${i})"> 
                    <i class="fa-solid fa-trash"></i> 
                    Delete
                </button>
              </td>
            </tr>
        `;
  }

  document.getElementById("site").innerHTML = tmp;
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("sitesKey", JSON.stringify(sites));
  display();
}

function isUrlValid(url) {
  const regex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/.*)?$/;
  return regex.test(url);
}
