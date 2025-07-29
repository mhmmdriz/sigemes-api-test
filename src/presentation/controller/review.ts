import { Request, Response, NextFunction } from 'express';
import { Review } from '../../domain/entity/review';
import { ReviewUsecase } from '../../usecase/review';
import { BaseSuccessPaginatedResponse, BaseSuccessResponse } from '../dto/response/base/base-success';
import { GetReviewResponse } from '../dto/response/review/get-review';
import { ReviewValidation } from '../validation/review';
import { File } from '../../domain/interface/library/file';
import { CreateReviewRequest } from '../dto/request/review/create-review';
import { DeletedReviewMediaRequest } from '../dto/request/review/deleted-media';
import { ReviewMedia } from '../../domain/entity/review-media';
import { ReviewReply } from '../../domain/entity/review-reply';
import { ReviewReplyRequest } from '../dto/request/review/review-reply';
import { GetReviewReplyResponse } from '../dto/response/review/get-review-reply';
import { Pagination } from '../../domain/entity/pagination';
import { PaginationResponse } from '../dto/response/pagination/pagination';

export class ReviewController {
    constructor(private reviewUsecase: ReviewUsecase) { }

    public async getReviewsByCityHallId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id: cityHallId } = ReviewValidation.id.parse({ id: Number(req.params.id) });
            const pagination = ReviewValidation.pagination.parse({
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
            });

            const result: {
                pagination: Pagination,
                reviews: Review[]
            } = await this.reviewUsecase.getReviewsByCityHallId(cityHallId, pagination.page, pagination.limit);

            const paginationResponse: PaginationResponse = PaginationResponse.fromEntity(result.pagination);
            const reviewsResponse: GetReviewResponse[] = result.reviews.map(review => GetReviewResponse.fromEntity(review));

            res.status(200).json(new BaseSuccessPaginatedResponse(true, "Get all city hall reviews success", paginationResponse, reviewsResponse));
        } catch (error) {
            next(error);
        }
    }

    public async getReviewsByGuesthouseRoomId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id: roomId } = ReviewValidation.id.parse({ id: Number(req.params.room_id) });
            const pagination = ReviewValidation.pagination.parse({
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
            });
            
            const result: {
                pagination: Pagination,
                reviews: Review[]
            } = await this.reviewUsecase.getReviewsByGuesthouseRoomId(roomId, pagination.page, pagination.limit);

            const paginationResponse: PaginationResponse = PaginationResponse.fromEntity(result.pagination);
            const reviewsResponse: GetReviewResponse[] = result.reviews.map(review => GetReviewResponse.fromEntity(review));

            res.status(200).json(new BaseSuccessPaginatedResponse(true, "Get all guesthouse room reviews success", paginationResponse, reviewsResponse));
        } catch (error) {
            next(error);
        }
    }

    public async getReviewByRentId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id: rentId } = ReviewValidation.id.parse({ id: Number(req.params.rent_id) });
            const review: Review = await this.reviewUsecase.getReviewByRentId(rentId);
            const reviewResponse: GetReviewResponse = GetReviewResponse.fromEntity(review);
            res.status(200).json(new BaseSuccessResponse(true, "Get review by rent id success", reviewResponse));
        } catch (error) {
            next(error);
        }
    }

    public async createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let reviewMedia: File[] = [];
            if (typeof req.body.rating === 'string') {
                req.body.rating = Number(req.body.rating);
            }
            
            const { id: rentId } = ReviewValidation.id.parse({ id: Number(req.params.rent_id) });
            const review: CreateReviewRequest = ReviewValidation.createReview.parse(req.body);
            const reviewEntity: Review = CreateReviewRequest.toEntity(review);
            reviewEntity.rentId = rentId;

            if (req.files && Array.isArray(req.files)) {
                reviewMedia = req.files.map(file => ({
                    fieldname: file.fieldname,
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    buffer: file.buffer,
                    size: file.size
                }));
            }

            const createdReview: Review = await this.reviewUsecase.createReview(reviewEntity, reviewMedia, res.locals.user.id);
            const reviewResponse: GetReviewResponse = GetReviewResponse.fromEntity(createdReview);
            res.status(201).json(new BaseSuccessResponse(true, "Create review success", reviewResponse));

        } catch (error) {
            next(error);
        }
    }

    public async updateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let reviewMedia: File[] = [];
            let deletedMediaObject: DeletedReviewMediaRequest[] = [];
            if (typeof req.body.rating === 'string') {
                req.body.rating = Number(req.body.rating);
            }
            if (typeof req.body.deleted_media_object === 'string') {
                req.body.deleted_media_object = JSON.parse(req.body.deleted_media_object);
            }

            const { id: renterId } = ReviewValidation.id.parse({ id: Number(res.locals.user.id) });
            const { id: rentId } = ReviewValidation.id.parse({ id: Number(req.params.rent_id) });
            const { id: reviewId } = ReviewValidation.id.parse({ id: Number(req.params.review_id) });
            const review: CreateReviewRequest = ReviewValidation.createReview.parse(req.body);
            const reviewEntity: Review = CreateReviewRequest.toEntity(review);
            reviewEntity.id = reviewId;
            reviewEntity.rentId = rentId;
            
            if (req.files && Array.isArray(req.files)) {
                reviewMedia = req.files.map(file => ({
                    fieldname: file.fieldname,
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    buffer: file.buffer,
                    size: file.size
                }));
            }

            if (req.body.deleted_media_object) {
                const parsedDeletedMediaObject = ReviewValidation.deletedMedia.parse({ deleted_media_object: req.body.deleted_media_object });
                deletedMediaObject = parsedDeletedMediaObject.deleted_media_object;
            }

            const deletedMediaEntity: ReviewMedia[] = deletedMediaObject.map((media) => ({
                id: media.id,
                reviewId: reviewId,
                url: media.url,
            }));

            const updatedReview: Review = await this.reviewUsecase.updateReview(renterId, reviewEntity, reviewMedia, deletedMediaEntity);
            const reviewResponse: GetReviewResponse = GetReviewResponse.fromEntity(updatedReview);
            res.status(200).json(new BaseSuccessResponse(true, "Update review success", reviewResponse));
        } catch (error) {
            next(error);
        }
    }

    public async createReviewReply(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id: reviewId } = ReviewValidation.id.parse({ id: Number(req.params.review_id) });
            const reviewReply: ReviewReplyRequest = ReviewValidation.createReviewReply.parse(req.body);
            const reviewReplyEntity: ReviewReply = ReviewReplyRequest.toEntity(reviewReply);
            reviewReplyEntity.reviewId = reviewId;
            reviewReplyEntity.adminId = Number(res.locals.user.id);
            const createdReviewReply: ReviewReply = await this.reviewUsecase.createReviewReply(reviewReplyEntity);
            const reviewReplyResponse: GetReviewReplyResponse = GetReviewReplyResponse.fromEntity(createdReviewReply);
            res.status(201).json(new BaseSuccessResponse(true, "Create review reply success", reviewReplyResponse));
        } catch (error) {
            next(error);
        }
    }

    public async updateReviewReply(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id: reviewReplyId } = ReviewValidation.id.parse({ id: Number(req.params.reply_id) });
            const reviewReply: ReviewReplyRequest = ReviewValidation.createReviewReply.parse(req.body);
            const reviewReplyEntity: ReviewReply = ReviewReplyRequest.toEntity(reviewReply);
            reviewReplyEntity.id = reviewReplyId;
            reviewReplyEntity.adminId = Number(res.locals.user.id);
            const updatedReviewReply: ReviewReply = await this.reviewUsecase.updateReviewReply(reviewReplyEntity);
            const reviewReplyResponse: GetReviewReplyResponse = GetReviewReplyResponse.fromEntity(updatedReviewReply);
            res.status(200).json(new BaseSuccessResponse(true, "Update review reply success", reviewReplyResponse));
        } catch (error) {
            next(error);
        }
    }

    public async deleteReviewReply(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id: reviewReplyId } = ReviewValidation.id.parse({ id: Number(req.params.reply_id) });
            const deleted: boolean = await this.reviewUsecase.deleteReviewReplyById(reviewReplyId);
            res.status(200).json(new BaseSuccessResponse(true, "Delete review reply success", null));
        } catch (error) {
            next(error);
        }
    }
}