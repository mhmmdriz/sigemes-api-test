import { ObjectStorageInterface } from "../../domain/interface/external-service/object-storage";
import { File } from "../../domain/interface/library/file";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

export class LocalStorageService implements ObjectStorageInterface {
    private baseStoragePath = path.join(__dirname, "../../../public/uploads"); // Folder penyimpanan lokal
    private baseUrl = "/uploads"; // URL path yang nanti diakses dari browser

    constructor() {}

    public async uploadFile(file: File, destinationPath: string): Promise<string> {
        const folderPath = path.join(this.baseStoragePath, destinationPath);

        if (!(await exists(folderPath))) {
            await mkdir(folderPath, { recursive: true });
        }

        const filePath = path.join(folderPath, file.originalName);
        await writeFile(filePath, file.buffer);

        // Kembalikan path yang bisa diakses via URL dari frontend
        return `http://localhost:8080${this.baseUrl}/${destinationPath}/${file.originalName}`;
    }

    public async uploadMultipleFiles(files: File[], destinationPath: string): Promise<string[]> {
        const urls: string[] = [];
        for (const file of files) {
            const url = await this.uploadFile(file, destinationPath);
            urls.push(url);
        }
        return urls;
    }

    public async deleteFile(pathUrl: string): Promise<void> {
        const filePath = path.join(this.baseStoragePath, pathUrl.replace(this.baseUrl + "/", ""));
        if (await exists(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
