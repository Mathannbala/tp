import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkSTLReader from '@kitware/vtk.js/IO/Geometry/STLReader';
import vtkOBJReader from '@kitware/vtk.js/IO/Misc/OBJReader';
import vtkITKPolyDataReader from '@kitware/vtk.js/IO/Misc/ITKPolyDataReader';
import readPolyDataArrayBuffer from 'itk/readPolyDataArrayBuffer';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { Scene } from 'three';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';
import { readAsync } from './ReadAsync';

export async function RenderFile(files, renderer) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        switch (file.name.split(".")[1]) {
            case "stl":
                var data = await readAsync(file, "arrayBuffer");
                const stlReader = vtkSTLReader.newInstance();
                const stlMapper = vtkMapper.newInstance();
                const stlActor = vtkActor.newInstance();
                stlActor.setMapper(stlMapper);
                stlMapper.setInputConnection(stlReader.getOutputPort());
                stlReader.parseAsArrayBuffer(data);
                renderer.addActor(stlActor);
                break;
            case "obj":
                var data = await readAsync(file, 'string');
                const objReader = vtkOBJReader.newInstance();
                objReader.parseAsText(data);
                const nbOutputs = objReader.getNumberOfOutputPorts();
                for (let index = 0; index < nbOutputs; index++) {
                    const objSource = objReader.getOutputData(index);
                    const objMapper = vtkMapper.newInstance();
                    const objActor = vtkActor.newInstance();

                    objActor.setMapper(objMapper);
                    objMapper.setInputData(objSource);
                    renderer.addActor(objActor);
                }
                break;
            case "vtk":
                vtkITKPolyDataReader.setReadPolyDataArrayBufferFromITK(readPolyDataArrayBuffer);
                var data = await readAsync(file, 'arrayb');

                const vtkReader = vtkITKPolyDataReader.newInstance({
                    fileName: file.name,
                });
                await vtkReader.parseAsArrayBuffer(data);
                const numOutputs = vtkReader.getNumberOfOutputPorts();
                for (let idx = 0; idx < numOutputs; idx++) {
                    const source = vtkReader.getOutputData(idx);
                    const mapper = vtkMapper.newInstance();
                    const actor = vtkActor.newInstance();
                    actor.setMapper(mapper);
                    mapper.setInputData(source);
                    renderer.addActor(actor);
                }
            case "3ds":
                var data = await readAsync(file, 'arrayb');
                const exporter = new OBJExporter();
                let dsscene = new Scene();
                const loader = new TDSLoader();
                let object = loader.parse(data);
                dsscene.add(object);
                let objData = exporter.parse(dsscene);

                const obj3dsReader = vtkOBJReader.newInstance();
                obj3dsReader.parseAsText(objData);
                const nb2Outputs = obj3dsReader.getNumberOfOutputPorts();
                for (let index = 0; index < nb2Outputs; index++) {
                    const obj3dsSource = obj3dsReader.getOutputData(index);
                    const obj3dsMapper = vtkMapper.newInstance();
                    const obj3dsActor = vtkActor.newInstance();

                    obj3dsActor.setMapper(obj3dsMapper);
                    obj3dsMapper.setInputData(obj3dsSource);
                    renderer.addActor(obj3dsActor);
                }
                break;
            default:
                break;
        }
    }
}
