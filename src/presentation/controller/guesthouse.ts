import { Request, Response, NextFunction } from 'express';
import { Guesthouse } from '../../domain/entity/guesthouse';
import { GuesthouseMedia } from '../../domain/entity/guesthouse-media';
import { GuesthouseUsecase } from '../../usecase/guesthouse';
import { BaseSuccessResponse } from '../dto/response/base/base-success';
import { GetGuesthouseResponse } from '../dto/response/guesthouse/get-data';
import { GuesthouseValidation } from '../validation/guesthouse';
import { File } from '../../domain/interface/library/file';
import { CreateGuesthouseRequest } from '../dto/request/guesthouse/create';
import { GuesthouseMediaRequest } from '../dto/request/guesthouse/media';

export class GuesthouseController {
    constructor(private guesthouseUsecase: GuesthouseUsecase) {}

    public async getAllGuesthouses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const guesthouses: Guesthouse[] = await this.guesthouseUsecase.getAllGuesthouses();
            const guesthousesResponse: GetGuesthouseResponse[] = guesthouses.map(guesthouse => GetGuesthouseResponse.fromEntity(guesthouse));
            res.status(200).json(new BaseSuccessResponse(true, "Get all guesthouse success", guesthousesResponse));
        } catch (error) {
            next(error);
        }
    }

    public async getGuesthouseById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = GuesthouseValidation.id.parse({ id: Number(req.params.id)});
            const guesthouse: Guesthouse = await this.guesthouseUsecase.getGuesthouseById(id);
            const guesthouseResponse: GetGuesthouseResponse = GetGuesthouseResponse.fromEntity(guesthouse);
            res.status(200).json(new BaseSuccessResponse(true, "Get guesthouse success", guesthouseResponse));
        } catch (error) {
            next(error);
        }
    }

    public async createGuesthouse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let guesthouseMedia: File[] = [];
            if (typeof req.body.area_m2 === 'string') {
                req.body.area_m2 = parseFloat(req.body.area_m2);
            }
            if (typeof req.body.people_capacity === 'string') {
                req.body.people_capacity = parseInt(req.body.people_capacity);
            }
            if (typeof req.body.latitude === 'string') {
                req.body.latitude = parseFloat(req.body.latitude);
            }
            if (typeof req.body.longitude === 'string') {
                req.body.longitude = parseFloat(req.body.longitude);
            }

            const guesthouse: CreateGuesthouseRequest = GuesthouseValidation.createGuesthouse.parse(req.body);

            if (req.files && Array.isArray(req.files)) {
                guesthouseMedia = req.files.map(file => ({
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    buffer: file.buffer,
                    size: file.size,
                }));
            }

            const newGuesthouse: Guesthouse = await this.guesthouseUsecase.createGuesthouse(CreateGuesthouseRequest.toEntity(guesthouse), guesthouseMedia);
            const guesthouseResponse: GetGuesthouseResponse = GetGuesthouseResponse.fromEntity(newGuesthouse);
            res.status(201).json(new BaseSuccessResponse(true, "Create guesthouse success", guesthouseResponse));
        } catch (error) {
            next(error);
        }
    }

    public async updateGuesthouse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let newGuesthouseMedia: File[] = [];
            let deletedGuesthouseMedia: GuesthouseMediaRequest[] = [];
            if (typeof req.body.area_m2 === 'string') {
                req.body.area_m2 = parseFloat(req.body.area_m2);
            }
            if (typeof req.body.people_capacity === 'string') {
                req.body.people_capacity = parseInt(req.body.people_capacity);
            }
            if (typeof req.body.latitude === 'string') {
                req.body.latitude = parseFloat(req.body.latitude);
            }
            if (typeof req.body.longitude === 'string') {
                req.body.longitude = parseFloat(req.body.longitude);
            }
            if (typeof req.body.deleted_media === 'string') {
                req.body.deleted_media = JSON.parse(req.body.deleted_media);
            }

            const { id } = GuesthouseValidation.id.parse({ id: Number(req.params.id)});
            
            const guesthouse: CreateGuesthouseRequest = GuesthouseValidation.createGuesthouse.parse(req.body);

            if (req.files && Array.isArray(req.files)) {
                newGuesthouseMedia = req.files.map(file => ({
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    buffer: file.buffer,
                    size: file.size,
                }));
            }

            if (req.body.deleted_media) {
                deletedGuesthouseMedia = GuesthouseValidation.deletedMedia.parse(req.body.deleted_media);
            }

            const guesthouseEntity: Guesthouse = CreateGuesthouseRequest.toEntity(guesthouse);
            const deletedGuesthouseMediaEntity: GuesthouseMedia[] = deletedGuesthouseMedia.map(media => GuesthouseMediaRequest.toEntity(media));

            const updatedGuesthouse: Guesthouse = await this.guesthouseUsecase.updateGuesthouse(id, guesthouseEntity, newGuesthouseMedia, deletedGuesthouseMediaEntity);
            const guesthouseResponse: GetGuesthouseResponse = GetGuesthouseResponse.fromEntity(updatedGuesthouse);
            res.status(200).json(new BaseSuccessResponse(true, "Update guesthouse success", guesthouseResponse));
        } catch (error) {
            next(error);
        }
    }

    public async deleteGuesthouse(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = GuesthouseValidation.id.parse({ id: Number(req.params.id)});
            await this.guesthouseUsecase.deleteGuesthouse(id);
            res.status(200).json(new BaseSuccessResponse(true, "Delete guesthouse success"));
        } catch (error) {
            next(error);
        }
    }
}