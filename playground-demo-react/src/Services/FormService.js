import axios from "axios";
import { FORM_UPLOAD_URL } from "../constants";

export const formUpload = async (data) => {
    console.log("In form upload service")
    const response = await axios.post(
        FORM_UPLOAD_URL,
        {
            uuid: data.projectToken,
            cores: data.cores,
            solarMeshRes: data.solar.meshResolution.value ? parseFloat(data.solar.meshResolution.value) : 0.10,
            solarMeshOffset: data.solar.meshOffset.value ? parseFloat(data.solar.meshOffset.value) : 0.0,
            solarSimType: "test",
            solarIrradiation: data.solar.solarIrradiation.value,
            solarAbsorbedEnergy: Boolean(data.solar.absorbedSolarEnergy.value),
            solarShading: Boolean(data.solar.solarShading.value),
            solarDaylight: Boolean(data.solar.daylightIlluminance.value),
            solarIrradiance: Boolean(data.solar.solarIrradiance.value),
            solarAbsorbedHeat: Boolean(data.solar.absorbedHeatFlux.value),
            solarSkyView: Boolean(data.solar.skyViewFactor.value),
            solarMultipleHourSim: Boolean(data.solar.multiHourlySim.value),
            solarStartDate: data.solar.startDateTime.value ? new Date(data.solar.startDateTime.value) : new Date(),
            solarStartTime: data.solar.startDateTime.value ? new Date(data.solar.startDateTime.value) : new Date(),
            solarEndDate: data.solar.endDateTime.value ? new Date(data.solar.endDateTime.value) : new Date(),
            solarEndTime: data.solar.endDateTime.value ? new Date(data.solar.endDateTime.value) : new Date(),
            solarReflection: parseInt(data.solar.reflection.value),
            solarSamplingRay: parseInt(data.solar.samplingRay.value),
            solarPIT: Boolean(data.solar.pointInTime.value),
            solarCumSky: Boolean(data.solar.cumulativeSky.value),
            solarMultiband: data.solar.multiband.value,
            
            windStartDate: data.wind.startDateTime.value ? new Date(data.wind.startDateTime.value) : new Date(),
            windEndDate: data.wind.startDateTime.value ? new Date(data.wind.startDateTime.value) : new Date(),
            windSpeed: data.wind.windSpeed.value ? parseFloat(data.wind.windSpeed.value) : 1.0,
            windDir: data.wind.windDirection.value,
            windDirVal: data.wind.windDirectionVal.value ? parseFloat(data.wind.windDirectionVal.value) : 0.0,
            windRefHeight: data.wind.refWindHeight.value ? parseFloat(data.wind.refWindHeight.value) : 2.0,
            windRefTemp: data.wind.refTemp.value ? parseFloat(data.wind.refTemp.value) : 0.0,
            windRefTempHeight: data.wind.refTempHeight.value ? parseFloat(data.wind.refTempHeight.value) : 0.0,
            windInfSurType: data.wind.inflowSurfaceType.value,
            windGrdSurType: data.wind.groundSurfaceType.value,
            windMeshSpaceX: data.wind.meshSpacingX.value ? parseFloat(data.wind.meshSpacingX.value) : 1.0,
            windMeshSpaceY: data.wind.meshSpacingY.value ? parseFloat(data.wind.meshSpacingY.value) : 1.0,
            windPreDefSlice: Boolean(data.wind.meshGenSlices.value),
            windPlotRes: Boolean(data.wind.meshGenPlot.value),
            
            noiseRecGrid: data.noise.receiverGrid.value,
            noiseRecGridOff: data.noise.receiverGridVal.value ? parseFloat(data.noise.receiverGridVal.value) : 0.15,
            noiseMeshRes: data.noise.meshResolution.value ? parseFloat(data.noise.meshResolution.value) : 1.0,
            noiseCat: parseInt(data.noise.noiseCategory.value.charAt(data.noise.noiseCategory.value.length-1)),
            noiseInputType: data.noise.inputType.value,
            noiseInputVal: data.noise.inputTypeVal.value ? parseFloat(data.noise.inputTypeVal.value) : 77.2,
            noiseMatAbs: data.noise.materialAbsorption.value ? parseFloat(data.noise.materialAbsorption.value) : 0.0,        });

    console.log(response);
    return response.data;
  };
  