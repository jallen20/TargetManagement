module.exports = {
	 entry: ['babel-polyfill', './entry.js'],

  output: {
    filename: 'app.bundle.js'       
  },
    module: {

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
				
            }
        ]
		
    }
};