console.log("Products frontend javascript file");

$(function () {
    // Function to handle the change event of product-collection
    function handleProductCollectionChange() {
        const selectedValue = $(".product-collection").val();
        if (selectedValue === "DESSERT") {
            // Hide and disable the product-volume select element
            $("#product-volume").hide().find("select").prop("disabled", true).val(null);
        } else {
            // Show and enable the product-volume select element
            $("#product-volume").show().find("select").prop("disabled", false);
        }
    }

    // Initial check on page load
    handleProductCollectionChange();

    // Event listener for changes in the product-collection
    $(".product-collection").on("change", handleProductCollectionChange);
});

    $("#process-btn").on("click", () => {
        $(".dish-container").slideToggle(500); 
        $("#process-btn").css("display", "none");
    });

    $("#cancel-btn").on("click", () => {
        $(".dish-container").slideToggle(100); 
        $("#process-btn").css("display", "flex");
    });


    $(".new-product-status").on("change", async function (e) {
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();
        console.log("id: ", id);
        console.log("productStatus: ",  productStatus);

        try {
            const response = await axios.post(`/admin/product/${id}`, {
                productStatus: productStatus,
            });
            console.log("response: ", response);
            const result = response.data;
            if (result.data) {
              console.log("Product updated successfully!");
              $("new-product-status").blur();               
            } else alert("Product updated failed!");
            
        } catch (err) {
            console.log(err);
            alert("Product updated failed!");        
        }
    });


function  validateForm() {  
    const productName = $(".product-name").val();
    const productPrice = $(".product-price").val();
    const productLeftCount = $(".product-left-count").val();
    const productCollection = $(".product-collection").val();
    const productDesc = $(".product-desc").val();
    const productStatus = $(".product-status").val();

    if(
        productName ===  "" ||
        productPrice  === "" ||
        productLeftCount === "" ||
        productCollection === "" ||
        productDesc === "" ||
        productStatus === ""
        ) {
            alert ("Please insert all details!");
            return false;
        } else return true;
  }

  function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("input:", input);
   
    const file = $(`.${imgClassName}`).get(0).files[0];
    const fileType = file["type"];
    const validImageType = ["image/jpg","image/jpeg","image/png"];

    if(!validImageType.includes(fileType)){
        alert( "Please insert only jpeg, jpg and png!");

    }else {
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                $(`#image-section-${order}`).attr("src", reader.result);
            };
            reader.readAsDataURL(file);
        }
  }
}