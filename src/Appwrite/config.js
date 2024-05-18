import conf from "../conf/conf.js";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  Databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectID
    );
    this.Databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImage, stauts, userId }) {
    try {
      return await this.Databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          stauts,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, stauts, userId }) {
    try {
      return await this.Databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          stauts,
          //   userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: UpdatePost :: errro ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.Databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: DeletePost :: errro ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: GetPost :: errro ", error);
      return false;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service :: getAllPost :: errro ", error);
      return false;
    }
  }

  // file upload

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBuketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: UploadFile :: errro ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBuketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: DeleteFile :: errro ", error);
      return false;
    }
  }

   filePreview(fileId) {
    try {
      return  this.bucket.getFilePreview(conf.appwriteBuketID, fileId);
    } catch (error) {
      console.log("Appwrite Service :: filePreview :: errro ", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
