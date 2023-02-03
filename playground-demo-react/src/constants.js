export const LOGIN_URL = "http://localhost:8080/api/user/login"
export const FILE_UPLOAD_URL = "http://localhost:8080/api/files/uploadfile"
export const UNDO_FILE_UPLOAD_URL = "http://localhost:8080/api/files/undouploadfile"
export const GET_PROJECT_TOKEN_URL = "http://localhost:8080/api/project/token"
export const FORM_UPLOAD_URL = "http://localhost:8080/api/form/uploadform"
export const NOISE_FILE_UPLOAD_URL = "http://localhost:8080/api/files/uploadnoisefile"
export const UNDO_NOISE_FILE_UPLOAD_URL= "http://localhost:8080/api/files/undouploadnoisefile"
export const GET_PROJECT_RESULTS_URL= "http://localhost:8080/api/project/pull"
export const POLL_PROJECT_STATUS_URL= "http://localhost:8080/api/project/check"

export const GET_PROJECT_RESULTS_SUCCESS = "GET_PROJECT_RESULTS_SUCCESS"
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS"
export const FILE_UPLOAD_FAIL = "FILE_UPLOAD_FAIL"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT = "LOGOUT"

export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION"
export const SET_MESSAGE = "SET_MESSAGE"
export const CLEAR_MESSAGE = "CLEAR_MESSAGE"
export const SET_FILES_URL = "SET_FILES_URL"
export const SET_FILES_URL_ARR_NUM = "SET_FILES_URL_ARR_NUM"
export const SET_SHOW_PREVIEW = "SET_SHOW_PREVIEW"
export const ADD_FILE = "ADD_FILE"
export const REMOVE_FILE = "REMOVE_FILE"
export const UPDATE_PROJECT_TYPE = "UPDATE_PROJECT_TYPE"
export const SET_SUBMIT_FORM_FLAG = "SET_SUBMIT_FORM_FLAG"
export const FORM_SUBMIT_SUCCESS = "FORM_SUBMIT_SUCCESS"
export const CLEARED_FILE = "CLEARED_FILE"
export const SUPPORTED_FILE_TYPES = ".stl,.obj,.vtk,.3ds" 
export const ILLEGAL_FILE_EXCEPTION_MESSAGE = "Only " + SUPPORTED_FILE_TYPES + " are allowed" 
export const GET_PROJECT_TOKEN_SUCCESS = "GET_PROJECT_TOKEN_SUCCESS"
export const GET_PROJECT_TOKEN_FAIL = "GET_PROJECT_TOKEN_FAIL"
export const SET_PROJECT_CORES = "SET_PROJECT_CORES"

export const START_DATE_TIME = "startDateTime";
export const END_DATE_TIME = "endDateTime";

// wind constants
export const REF_WIND_HEIGHT_MIN = 2
export const REF_WIND_HEIGHT_MAX = 500
export const REF_WIND_TEMP_MIN = 10
export const REF_WIND_TEMP_MAX = 40
export const REF_WIND_TEMP_HEIGHT_MIN = 2
export const REF_WIND_TEMP_HEIGHT_MAX = 500
export const WIND_SPEED_MIN = 1
export const WIND_SPEED_MAX = 20
export const WIND_MESH_SPACING_X_MIN = 1
export const WIND_MESH_SPACING_X_MAX = 50
export const WIND_MESH_SPACING_Y_MIN = 1
export const WIND_MESH_SPACING_Y_MAX = 50

export const CLOUD_CONDITION = "cloudCondition";
export const WIND_SPEED = "windSpeed";
export const WIND_DIRECTION = "windDirection";
export const WIND_DIRECTION_VAL = "windDirectionVal";
export const REF_WIND_HEIGHT = "refWindHeight";
export const REF_TEMP = "refTemp";
export const REF_TEMP_HEIGHT = "refTempHeight";
export const INFLOW_SURFACE_TYPE = "inflowSurfaceType";
export const GROUND_SURFACE_TYPE = "groundSurfaceType";
export const MESH_SPACING_X = "meshSpacingX";
export const MESH_SPACING_Y = "meshSpacingY";

export const MESH_GEN_SLICES = "meshGenSlices";
export const MESH_GEN_SLICES_LABEL = "Predefined Slices";

export const MESH_GEN_PLOT = "meshGenPlot";
export const MESH_GEN_PLOT_LABEL = "Plot Residuals";

// solar constants
export const MESH_RESOLUTION_MIN = 0.1
export const MESH_RESOLUTION_MAX = 10
export const MESH_OFFSET_MIN = 0
export const MESH_OFFSET_MAX = 0.3

export const MESH_RESOLUTION = "meshResolution";
export const SHOW_ADVANCED_OPTIONS = "showAdvancedOptions";
export const MESH_OFFSET = "meshOffset";
export const MULTI_HOURLY_SIM = "multiHourlySim";
export const REFLECTION = "reflection";
export const SAMPLING_RAY = "samplingRay";
export const SUN_INCLUSION = "sunInclusion";
export const MULTIBAND = "multiband";

export const POINT_IN_TIME = "pointInTime";
export const POINT_IN_TIME_LABEL = "Point-in-time";

export const CUMULATIVE_SKY = "cumulativeSky";
export const CUMULATIVE_SKY_LABEL = "Cumulative Sky";

export const SOLAR_IRRADIATION = "solarIrradiation";
export const SOLAR_IRRADIATION_LABEL = "Solar Irradiation (Wh/m\u00b2)";

export const ABSORBED_SOLAR_ENERGY = "absorbedSolarEnergy";
export const ABSORBED_SOLAR_ENERGY_LABEL = "Absorbed Solar Energy (Wh/m\u00b2)";

export const SOLAR_SHADING = "solarShading";
export const SOLAR_SHADING_LABEL = "Solar Shading";

export const DAYLIGHT_ILLUMINANCE = "daylightIlluminance";
export const DAYLIGHT_ILLUMINANCE_LABEL = "Daylight Illuminance (Lux)";

export const SOLAR_IRRADIANCE = "solarIrradiance";
export const SOLAR_IRRADIANCE_LABEL = "Solar Irradiance (W/m\u00b2)";

export const ABSORBED_HEAT_FLUX = "absorbedHeatFlux";
export const ABSORBED_HEAT_FLUX_LABEL = "Absorbed Heat Flux (W/m\u00b2)";

export const SKY_VIEW_FACTOR = "skyViewFactor";
export const SKY_VIEW_FACTOR_LABEL = "Sky View Factor";

// noise constants
export const NOISE_FILE_RECEIVER = "RECEIVER"
export const NOISE_FILE_ROAD = "ROAD"
export const NOISE_RECEIVER_GRID_VAL_MIN = 0.15
export const NOISE_RECEIVER_GRID_VAL_CUT_MAX= 75
export const NOISE_RECEIVER_GRID_VAL_FACADE_MAX = 2

export const NOISE_MESH_RESOLUTION_MIN = 1
export const NOISE_MESH_RESOLUTION_MAX = 10

export const NOISE_HEAVY_VEHICLE_MIN = 0
export const NOISE_HEAVY_VEHICLE_MAX = 100

export const NOISE_MATERIAL_ABSORPTION_MIN = 0
export const NOISE_MATERIAL_ABSORPTION_MAX = 1

export const RECEIVER_POINTS = "receiverPoints";
export const RECEIVER_GRID = "receiverGrid";
export const RECEIVER_GRID_VAL = "receiverGridVal";
export const NOISE_CATEGORY = "noiseCategory";
export const ROAD_FILES = "roadFiles";
export const ROAD_CATEGORY = "roadCategory";
export const INPUT_TYPE = "inputType";
export const INPUT_TYPE_VAL = "inputTypeVal";
export const NO_OF_VEHICLES = "noOfVehicles";
export const VEHICLE_SPEED = "vehicleSpeed";
export const HEAVY_VEHICLES = "heavyVehicles";
export const MATERIAL_ABSORPTION = "materialAbsorption";
export const INPUT_TYPE_TRAFFIC = "Traffic";