import { ImageNode } from "ricos-content";
import { Subject } from "rxjs";
import { ImageContentService } from "../models";
import { ImageFactory } from "./image-factory";

export default class ImageContentManager implements ImageContentService {
  private _onImageAdded = new Subject<ImageNode>();
  private _onImageRemoved = new Subject<ImageNode>();
  private _onImageUpdated = new Subject<ImageNode>();
  private _factory: ImageFactory;

  constructor(factory: ImageFactory) {
    this._factory = factory;
  }

  addImage(data: ImageData): void {
    this._onImageAdded.next(this._factory.create(data));
  }
  updateImage(node: ImageNode): void {
    this._onImageUpdated.next(node);
  }
  removeImage(node: ImageNode): void {
    this._onImageRemoved.next(node);
  }
  public onImageAdded = this._onImageAdded.asObservable();
  public onImageUpdated = this._onImageUpdated.asObservable();
  public onImageRemoved = this._onImageRemoved.asObservable();
}
