sap.ui.define([
    "./Base.controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	'sap/ui/core/Fragment',
	"sap/ui/core/syncStyleClass",
	"sap/m/Dialog",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController , Filter, FilterOperator, MessageBox,Fragment, syncStyleClass, Dialog) {
        "use strict";

        return BaseController.extend("com.example.countphysicalinventory.controller.Main", {
            onInit: function () {
                BaseController.prototype.onInit.call(this);

                this._oRouter.getRoute("home");
			this._fetchRequestCPIData(); //method called to search the data
            },
		
		_fetchRequestCPIData: function () {
			//debugger;
			if (this._oComponent._oBackendModelAPI) {
  
			  this._oComponent._oBackendModelAPI
				.getRequestCPIData()
				.then(this.onRequestLoaded.bind(this))
				.catch(this.onRequestLoadFailed.bind(this));
			}
		  },
		  onRequestLoaded: function () {
			this._postProcessInitialDataLoad(true);
		  },
  
		  onRequestLoadFailed: function (oResponse) {
			this._postProcessInitialDataLoad(false);
		  },
		  _postProcessInitialDataLoad: function () {
			var aRequest =
			  this._oAppModel.getProperty("/REQUEST_CPI") || [];
		  },

		  onACR: function (oEvent) {
			var oButton = oEvent.getSource(),
			oView = this.getView();

		
		if (!this._pPopover) {
			this._pPopover = Fragment.load({
				id: oView.getId(),
				name: "com.example.countphysicalinventory.view.fragments.ACRTable",
				controller: this
			}).then(function(oPopover){
				oView.addDependent(oPopover);
				return oPopover;
			});
		}

		this._pPopover.then(function(oPopover){
			oPopover.openBy(oButton);
		});
		},

		onNavToProduct : function (oEvent) {
			var oCtx = oEvent.getSource().getBindingContext();
			var oNavCon = this.byId("navCon");
			var oDetailPage = this.byId("detail");
			oNavCon.to(oDetailPage);
			oDetailPage.bindElement(oCtx.getPath());
			this.byId("myPopover").focus();
		},

		onNavBack : function (oEvent) {
			var oNavCon = this.byId("navCon");
			oNavCon.back();
			this.byId("myPopover").focus();
		},
		onAssign : function (){
			var oTable = this.getView().byId("idACRTable");
var oModel = oTable.getModel();
var aData = oModel.getData();

// Create a new JSONModel for the selected data
var oSelectedModel = new sap.ui.model.json.JSONModel();

// Get the selected indices from the source table
var aIndices = oTable.getSelectedIndices();

// Loop through the selected indices and get the data for each row
var aSelectedData = [];
for (var i = 0; i < aIndices.length; i++) {
    var oRowData = oModel.getProperty("/" + aIndices[i]);
    aSelectedData.push(oRowData);
}

// Add the selected data to the new JSONModel
oSelectedModel.setData(aSelectedData);

// Set the data for the destination table
var oDestinationTable = this.getView().byId("idPItable");
oDestinationTable.setModel(oSelectedModel);
oDestinationTable.bindRows("/");
		}


		//   onACR: function (oEvent) {
		// 	var oButton = oEvent.getSource(),
		// 		oView = this.getView();

		// 	if (!this._pDialog) {
		// 		this._pDialog = Fragment.load({
		// 			id: oView.getId(),
		// 			name: "com.example.countphysicalinventory.view.fragments.ACRTable",
		// 			controller: this
		// 		}).then(function(oDialog){
		// 			oView.addDependent(oDialog);
		// 			return oDialog;
		// 		});
		// 	}

		// 	this._pDialog.then(function(oDialog){
		// 		this._configDialog(oButton, oDialog);
		// 		oDialog.open();
		// 	}.bind(this));
		// },

		// _configDialog: function (oButton, oDialog) {
			

			
		// 	var bMultiSelect = !!oButton.data("multi");
		// 	oDialog.setMultiSelect(bMultiSelect);

			
		// 	var bRemember = !!oButton.data("remember");
		// 	oDialog.setRememberSelections(bRemember);

		// 	var sResponsivePadding = oButton.data("responsivePadding");
		// 	var sResponsiveStyleClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--subHeader sapUiResponsivePadding--content sapUiResponsivePadding--footer";

		// 	if (sResponsivePadding) {
		// 		oDialog.addStyleClass(sResponsiveStyleClasses);
		// 	} else {
		// 		oDialog.removeStyleClass(sResponsiveStyleClasses);
		// 	}

		// 	var sCustomConfirmButtonText = oButton.data("confirmButtonText");
		// 	oDialog.setConfirmButtonText(sCustomConfirmButtonText);

			
		// 	syncStyleClass("sapUiSizeCompact", this.getView(), oDialog);
		// },

		

		// handleClose: function (oEvent) {
			
		// 	var oBinding = oEvent.getSource().getBinding("items");
			

		// 	var aContexts = oEvent.getParameter("selectedContexts");
		// 	if (aContexts && aContexts.length) {
		// 		MessageToast.show("You have chosen " + aContexts.map(function (oContext) { return oContext.getObject().Name; }).join(", "));
		// 	}

		// }
        });
    });
