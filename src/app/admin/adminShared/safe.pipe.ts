import {Pipe} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
	name: 'safe'
})
export class SafePipe {

	constructor(protected _sanitizer: DomSanitizer) {

	}

	public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		console.log("transforming url " + value + " "  + type );
		switch (type) {
			case 'html':
				return this._sanitizer.bypassSecurityTrustHtml(value);
			case 'style':
				return this._sanitizer.bypassSecurityTrustStyle(value);
			case 'script':
				return this._sanitizer.bypassSecurityTrustScript(value);
			case 'url':
				return this._sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl':
				let snval = this._sanitizer.bypassSecurityTrustResourceUrl(value);
				console.log("sanitized value " + snval);
				return snval;
			default:
				throw new Error(`Unable to bypass security for invalid type: ${type}`);
		}
	}

}