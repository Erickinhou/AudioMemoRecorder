export default class Controller {
  constructor({ view, media, recorder}){
      this.view = view
      this.media = media,
      this.recorder = recorder
  }

  static initialize(dependencies){
    const instance = new Controller(dependencies) 
    // to not use new when I create a Controller, 
    // I just made a method thats instance the controller 
    return instance._init()
  }

  _init(){ //underscore because is a private method
    this.view.configureStartRecordButton(this.onStartRecording.bind(this)) //set the controller class 'this', that allow the class to use controller methods
    this.view.configureStopRecordButton(this.onStopRecording.bind(this)) //set the controller class 'this', that allow the class to use controller methods
  }

  async onStartRecording(){
    console.log('hit here');
    const audioStream = await this.media.getAudio()
    this.recorder.startRecording(audioStream)
  }
  async onStopRecording(){
    this.recorder.stopRecording()
    setTimeout(()=>{
      const audioURL = this.recorder.getRecordingUrl() //this get the recorder data by browser API
      this.view.playAudio(audioURL)
    })
  }
}