
var modelFactory = function(){

    var mapping = {
        'Cars/4X4.php': Car4o4Model,
        'Cars/Car.php': Car4o4Model,
        'Cars/Motorcycle.php' : CarMotoModel,
        'Cars/MotorScooter.php' : CarMotoModel,
        'Nadlan/sales.php' : NadlanSaleModel,
        'Nadlan/rent.php' : NadlanRentModel,
        'Yad2/Yad2.php' : Yad2Model

    }

    function getModel(section){

            return mapping[section];
    }


    return {
        getModel: getModel
    }
}()
