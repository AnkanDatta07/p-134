img = "";
Status = "";
object = [];

function preload()
{
   img = loadImage("bgmi.jpg");
}

function setup()
{
    canvas = createCanvas(299, 173);
    canvas.center();

}

function draw()
{
    image(img, 0, 0, 299, 173);
    
    if(Status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);

        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of bjects detected are : " + object.length;

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + " %", object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }   
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    object = results;
}
    
function start_detection()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
