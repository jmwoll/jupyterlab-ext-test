import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils'

import {
  Widget
} from '@phosphor/widgets'


/**
 * Initialization data for the jupyterlab-ext-test extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-ext-test',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab-ext-test is activated!');
    
    // Create a blank content widget inside of a MainAreaWidget
    const content = new Widget();
    const widget = new MainAreaWidget({content});
    widget.id = 'apod-jupyterlab';
    widget.title.label = 'Astronomy Picture';
    widget.title.closable = true;

    // Add an application command
    const command: string = 'apod:open';
    app.commands.addCommand(command, {
        label: 'Astronomy Pic',
        execute: () => {
            // Attach the widget to the main work area if its not there
            if (!widget.isAttached){
                app.shell.add(widget,'main');
            }
            // Activate the widget
            app.shell.activateById(widget.id);
        }


       });
    
    // Add the command to the palette.
    palette.addItem({command,category:'Tutorial'});


    console.log('ICommandPalette', palette);
  }
};

export default extension;
