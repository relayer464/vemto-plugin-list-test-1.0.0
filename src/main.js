module.exports = (vemto) => {

    return {

        canInstall() {
            return true
        },

        onInstall() {
            vemto.savePluginData({
                text: 'Hello world!!'
            })
        },

        beforeCodeGenerationStart() {
            let data = vemto.getPluginData()

            vemto.log.info(data.text)
            vemto.log.warning(`That's awesome!!! A Vemto plugin showing a message during code generation`)
        },


	    templateReplacements() {
            vemto.replaceTemplate(`/Controller.vemtl`, 'files/Controller.vemtl')
            vemto.replaceTemplate(`/Routes.vemtl`, 'files/Routes.vemtl')
        },        

        beforeCodeGenerationEnd() {

            let models = vemto.getProjectModels()

            models.forEach(model => {
                let options = {}
                options.data = {model}

                vemto.renderTemplate('/files/ListView.vemtl', '/resources/views/app/' + model.table + '/list.blade.php', options)

            })
        },


    }

}