import mongoose from "mongoose";
import { User } from "../../models/userModel.js";
import { createUserModel, getUserProgress } from "../../services/userService.js";
import { UserProgressEnum } from "../../enums/UserProgressEnum.js";

describe('User Service', () => {
    it('create a user', async() => {
        const modelInstance = {
            name: 'name',
            email: 'test@test.com',
            password: 'password',
        };

        const findOne = jest.spyOn(User, 'findOne').mockResolvedValue(undefined);
        jest.spyOn(User.prototype, 'save').mockResolvedValue({
            ...modelInstance,
            progress: UserProgressEnum,
        });

        const { progress: { level, completion } } = await createUserModel(modelInstance);
        expect(findOne).toHaveBeenCalledTimes(1);
        expect({ level, completion }).toEqual(UserProgressEnum);
    });

    it('get a user progress', async() => {
        const fakeProgress = {
            level: 1,
            completion: '50%',
        };
        const findById = jest.spyOn(User, 'findById').mockResolvedValue({
            progress: fakeProgress 
        });

        const fakeUserId = new mongoose.Types.ObjectId();
        const result = await getUserProgress(fakeUserId);
        expect(findById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(fakeProgress);
    })
});