var regionSelectField = document.getElementById("region-select-field");
var districtSelectField = document.getElementById("district-select-field");
var suburbSelectField = document.getElementById("suburb-select-field");
var districtCollectionList = document.getElementById("district-collection-list");
var suburbCollectionList = document.getElementById("suburb-collection-list");

districtSelectField.disabled = true;
suburbSelectField.disabled = true;

window.addEventListener("load", start, false);

function start() {    
    regionSelectField.addEventListener("change", onChangeRegion, false);
    districtSelectField.addEventListener("change", onChangeDistrict, false);
}

function onChangeRegion(e) {
    e.preventDefault();
    var selectedRegionValue = regionSelectField.value;

    console.log(`***********`);
    console.log(`District Collection List Length: ${document.querySelectorAll('div.district-collection-list > div').length}`);

    // Reset the District AND Suburb Select Fields
    // select back to default
    reset('districts-reset-button');
    reset('suburbs-reset-button');

    console.log(`District Select Field Length: ${document.querySelectorAll('#district-select-field > option').length}`);
    console.log(`districtSelectField.options.length: ${districtSelectField.options.length}`);
    
    console.log(`Suburb Select Field Length: ${document.querySelectorAll('#suburb-select-field > option').length}`);
    console.log(`suburbSelectField.options.length: ${suburbSelectField.options.length}`);

    const districtSelectFieldLength = districtSelectField.options.length;
    const suburbSelectFieldLength = suburbSelectField.options.length;
    
    // Take each option from district AND suburb select and remove it, so that theres an empty list
    for (t=districtSelectFieldLength; t>=2; t--) {
        // $('#district-select-field').children('option[value="' + districtSelectField.options[t].value + '"]').remove();
        console.log(t);
        console.log(districtSelectFieldLength);
        console.log(`districtSelectField.options.length BEFORE DELETING SINGLE ITEM: ${districtSelectField.options.length}`);
        document.querySelector('#district-select-field :nth-child(' + t + ')').remove();
        console.log(`districtSelectField.options.length AFTER DELETING SINGLE ITEM: ${districtSelectField.options.length}`);
        console.log(districtSelectField);
    }
    console.log(`districtSelectField.options.length AFTER DELETING: ${districtSelectField.options.length}`);
    
    
    for (y=suburbSelectFieldLength; y>=2; y--) {
        document.querySelector('#suburb-select-field :nth-child(' + y + ')').remove();
    }

    // insert each item from district-text-block and suburb-text-block back in
    for (i=0; i<districtCollectionList.getElementsByClassName('district-collection-item').length; i++) {
        $('#district-select-field').append(`<option value="${districtCollectionList.getElementsByClassName("district-text-block")[i].textContent}">${districtCollectionList.getElementsByClassName("district-text-block")[i].textContent}</option>`);
    }
    for (p=0; p<suburbCollectionList.getElementsByClassName('suburb-collection-item').length; p++) {
        $('#suburb-select-field').append(`<option value="${suburbCollectionList.getElementsByClassName("suburb-text-block")[p].textContent}">${suburbCollectionList.getElementsByClassName("suburb-text-block")[p].textContent}</option>`);
    }

	// Loop through all classes of .region-district-text-block and compare with selectedRegionValue
    for (i=0; i<districtCollectionList.getElementsByClassName('district-collection-item').length; i++) {
        // If equals false, read out text of sibling class .district-text-block
        if (selectedRegionValue != districtCollectionList.getElementsByClassName("region-district-text-block")[i].textContent) {
            var regionDistrictTextBlock = districtCollectionList.getElementsByClassName("region-district-text-block")[i];
            var districtTextBlock = regionDistrictTextBlock.previousElementSibling.textContent;

            // Loop Select options, if same, remove option
            for (j=0; j<districtSelectField.options.length; j++) {
                if (districtTextBlock === districtSelectField.options[j].value) {
                    $('#district-select-field').children('option[value="' + districtSelectField.options[j].value + '"]').remove();
                }
            }
        }
    }

    // Disable select fields; disable district select field, if "Select Region..." was selected (no real value)
    if (regionSelectField.value) {
        districtSelectField.disabled = false;
    } else {
        districtSelectField.disabled = true;
    }
    suburbSelectField.disabled = true;
}
// regionSelectField.onchange = onChange;

function onChangeDistrict(e) {
    e.preventDefault();
    var selectedDistrictValue = districtSelectField.value;

    console.log(`Suburb Collection List Length: ${document.querySelectorAll('div.suburb-collection-list > div').length}`);
    
    // Reset the District Select Field
    // select back to default
    reset('suburbs-reset-button');

    console.log(`suburbSelectField.options.length: ${suburbSelectField.options.length}`);

    const suburbSelectFieldLength = suburbSelectField.options.length;

    // Take each option from suburb select and remove it, so that theres an empty list
    for (s=suburbSelectFieldLength; s>=2; s--) {
        // $('#suburb-select-field').children('option[value="' + suburbSelectField.options[t].value + '"]').remove();
        document.querySelector('#suburb-select-field :nth-child(' + s + ')').remove();
    }

    // insert each item from suburb-text-block back in
    for (u=0; u<suburbCollectionList.getElementsByClassName('suburb-collection-item').length; u++) {
        // var districtTextBlock = districtCollectionList.getElementsByClassName("district-text-block")[i];
        $('#suburb-select-field').append(`<option value="${suburbCollectionList.getElementsByClassName("suburb-text-block")[u].textContent}">${suburbCollectionList.getElementsByClassName("suburb-text-block")[u].textContent}</option>`);
    }

	// Loop through all classes of .suburb-district-text-block and compare with selectedDistrictValue
    for (i=0; i<suburbCollectionList.getElementsByClassName('suburb-collection-item').length; i++) {
    	// If equals false, read out text of sibling class .suburb-text-block
        if (selectedDistrictValue != suburbCollectionList.getElementsByClassName("district-suburb-text-block")[i].textContent) {
            var districtSuburbTextBlock = suburbCollectionList.getElementsByClassName("district-suburb-text-block")[i];
            var suburbTextBlock = districtSuburbTextBlock.previousElementSibling.textContent;

            // Loop Select options, if same, remove option
            for (j=0; j<suburbSelectField.options.length; j++) {
                if (suburbTextBlock === suburbSelectField.options[j].value) {
                    $('#suburb-select-field').children('option[value="' + suburbSelectField.options[j].value + '"]').remove();
                }
            }
        }
    }

    // Disable suburb select field; disable suburb select field, if "Select District..." was selected (no real value)
    if (districtSelectField.value) {
        suburbSelectField.disabled = false;
    } else {
        suburbSelectField.disabled = true;
    }
}

function reset(buttonId) {
    document.getElementById(buttonId).click();
}
