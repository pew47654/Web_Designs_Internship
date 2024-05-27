const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu')

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}

// Add event listeners to the dropdowns
document.getElementById("S2024").addEventListener("change", generateDownloadLink);
document.getElementById("Province").addEventListener("change", generateDownloadLink);

// Call the function initially to generate download link based on default values
generateDownloadLink();

function generateDownloadLink() {
    var province = document.getElementById("Province").value.split('|');
    var provinceID = province[0];
    var provinceName = province[1];

    var month = document.getElementById("S2024").value.split('|');
    var monthID = month[0];
    var monthName = month[1];
    if (monthID && provinceID) {
        // Constructing the URL based on selected options
        var baseUrl = "https://gistdaportal.gistda.or.th/cassava_biz/downloads/";
        var typeMapUrl = baseUrl + monthID + "_MAP/";
        var typeReportUrl = baseUrl + monthID + "_REPORT/";        
        var finalMapUrl = typeMapUrl + provinceID + "_CassavaMap_" + monthID + "_" + provinceName + ".pdf";
        var finalReportUrl = typeReportUrl + provinceID + "_CassavaReport_" + monthID + "_" + provinceName.replace(/\s/g, '') + ".xlsx";
        var finalZipUrl = baseUrl + monthID + "_SHP.zip";

        // Creating clickable links
        var maplink = createDownloadLink(finalMapUrl, "PDF", "fa-solid fa-file-pdf");
        var reportlink = createDownloadLink(finalReportUrl, "Excel", "fas fa-file-excel");
        var ziplink = createDownloadLink(finalZipUrl, "ZIP", "fa-solid fa-file-zipper");

        // Clearing previous links
        clearContainer(document.getElementById("downloadLinkContainer"));

        // Appending the links to the container
        var container = document.getElementById("downloadLinkContainer");
        container.appendChild(maplink);
        container.appendChild(document.createElement("br"));
        container.appendChild(reportlink);
        container.appendChild(document.createElement("br"));
        container.appendChild(ziplink);

        // Fade in
     container.style.opacity = "0";
        var fadeInInterval = setInterval(function() {
            container.style.opacity = (parseFloat(container.style.opacity) + 0.1).toString();
            if (parseFloat(container.style.opacity) >= 1) {
            clearInterval(fadeInInterval);
            }
        }, 100);
    } else {
        // If only province is selected, clear the container
        clearContainer(document.getElementById("downloadLinkContainer"));
    }
}

function createDownloadLink(url, text, iconClass) {
    var link = document.createElement("a");
    link.href = url;
    var link = document.createElement("a");
    link.href = url;
    link.style.display = "flex";
    link.style.flexDirection = "column"; // Set flex-direction to column
    link.style.alignItems = "center"; // Align items to the center
    link.style.textAlign = "center"; // Center-align the text
    link.style.border = "3px solid #111";
    link.style.padding = "2rem";
    link.style.borderRadius = "5px";
    
    var icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.color = "#111";
    icon.style.fontSize = "25px";
    icon.style.fontSize = "30px";

    
    
    var span = document.createElement("span");
    span.textContent = text;
    span.style.fontSize = "20px";
    
    link.appendChild(icon); // Append the icon to the link first
    link.appendChild(document.createElement("br")); // Add a line break
    link.appendChild(span); // Append the text to the link after the line break

    // Change text color on hover
    link.addEventListener("mouseenter", function() {
        link.style.backgroundColor = "#43873C";
        link.style.color = "#fff"; 
        icon.style.color = "#fff";
    });

    // Reset color when not hovered
    link.addEventListener("mouseleave", function() {
        link.style.backgroundColor = "transparent";
        link.style.color = "#111"; 
        icon.style.color = "inherit";
    });

    link.addEventListener("click", function() {
        link.style.backgroundColor = "#ddd"; // Change background color when clicked
        setTimeout(function() {
            link.style.backgroundColor = "transparent"; // Reset background color after a short delay
        }, 200);
    });
    return link;
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

